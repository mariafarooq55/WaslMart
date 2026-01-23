const userCollection = require("../models/user");
const bcrypt = require("bcrypt");
const productCollection = require("../models/product");
const queryCollection = require("../models/query");
const cartCollection = require("../models/cart");
const jwt = require("jsonwebtoken");
const orderCollection = require("../models/orderModel");

/* ================= REGISTER ================= */
const regDataController = async (req, res) => {
  try {
    const { fname, email, pass } = req.body;

    if (!fname || !email || !pass) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // ❌ Prevent admin registration
    if (email === process.env.ADMIN_EMAIL) {
      return res
        .status(403)
        .json({ message: "Admin account cannot be registered" });
    }

    const emailExist = await userCollection.findOne({
      userEmail: email,
    });

    if (emailExist) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashPassword = await bcrypt.hash(pass, 10);

    const record = new userCollection({
      userName: fname,
      userEmail: email,
      userPass: hashPassword,
      role: "user",
    });

    await record.save();

    res.status(200).json({ message: "Registration successful" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= LOGIN ================= */
const loginDataController = async (req, res) => {
  try {
    const { loginEmail, loginPass, loginRole } = req.body;

    /* ---------- ADMIN LOGIN ---------- */
    if (loginRole === "admin") {
      if (loginEmail !== process.env.ADMIN_EMAIL) {
        return res.status(403).json({ message: "Admin access denied" });
      }

      let adminUser = await userCollection.findOne({
        userEmail: process.env.ADMIN_EMAIL,
      });

      // 🔥 ALWAYS sync admin password from .env
      const hashedAdminPass = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);

      if (!adminUser) {
        adminUser = new userCollection({
          userName: "Admin",
          userEmail: process.env.ADMIN_EMAIL,
          userPass: hashedAdminPass,
          role: "admin",
        });
      } else {
        adminUser.userPass = hashedAdminPass;
        adminUser.role = "admin";
      }

      await adminUser.save();

      const isMatch = await bcrypt.compare(loginPass, adminUser.userPass);

      if (!isMatch) {
        return res.status(400).json({ message: "Incorrect admin password" });
      }

      const token = jwt.sign(
        {
          id: adminUser._id,
          role: "admin",
          userEmail: adminUser.userEmail,
        },
        process.env.JWT_SECRET,
        { expiresIn: "2d" },
      );

      return res.status(200).json({
        message: "Admin login successful",
        token,
        data: adminUser,
      });
    }

    /* ---------- USER LOGIN ---------- */
    const userCheck = await userCollection.findOne({
      userEmail: loginEmail,
    });

    if (!userCheck) {
      return res.status(400).json({ message: "User not found" });
    }

    const matchPass = await bcrypt.compare(loginPass, userCheck.userPass);

    if (!matchPass) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    const token = jwt.sign(
      {
        id: userCheck._id,
        role: userCheck.role,
        userEmail: userCheck.userEmail,
      },
      process.env.JWT_SECRET,
      { expiresIn: "2d" },
    );

    res.status(200).json({
      message: "Login successful",
      token,
      data: userCheck,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= PRODUCTS ================= */
const userProductController = async (req, res) => {
  try {
    const category = req.query.category;
    let filter = { productStatus: "In-Stock" };

    if (category && category.toLowerCase() !== "all") {
      // Case-insensitive partial match for better compatibility
      filter.productCategory = { $regex: category, $options: "i" };
    }

    const record = await productCollection.find(filter);
    res.status(200).json({ data: record });
  } catch (error) {
    console.error("Backend error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= GET SINGLE PRODUCT ================= */
const getSingleProductController = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    const product = await productCollection.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ data: product });
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= QUERY ================= */
const userQueryController = async (req, res) => {
  try {
    const { userName, userEmail, userQuery } = req.body;

    const record = new queryCollection({
      Name: userName,
      Email: userEmail,
      Query: userQuery,
    });

    await record.save();
    res.status(200).json({ message: "Query Submit Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= CART ================= */
const saveCartDataController = async (req, res) => {
  try {
    const { userId, cartItem, totalPrice, totalQuantity } = req.body;

    const cart = await cartCollection.findOne({ userId });

    if (cart) {
      cart.cartItem = cartItem;
      cart.totalPrice = totalPrice;
      cart.totalQuantity = totalQuantity;
      await cart.save();
    } else {
      const cart = new cartCollection({
        userId,
        cartItem,
        totalPrice,
        totalQuantity,
      });
      await cart.save();
    }

    res.status(200).json({ message: "Cart Save Successfully.." });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= SEARCH ================= */
const searchController = async (req, res) => {
  try {
    const keyword = req.query.q;

    const result = await productCollection.find({
      productName: { $regex: keyword, $options: "i" },
      productStatus: "In-Stock",
    });

    res.status(200).json({ data: result });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= GET CART ================= */
const getCartController = async (req, res) => {
  try {
    const userId = req.params.id;
    const cart = await cartCollection.findOne({ userId });
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= ORDER ================= */
const placeOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { items, amount, shippingAddress } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const order = new orderCollection({
      userId,
      items,
      amount,
      shippingAddress,
      paymentMethod: "COD",
      status: "Pending",
    });

    await order.save();

    await cartCollection.findOneAndUpdate(
      { userId },
      { cartItem: [], totalPrice: 0, totalQuantity: 0 },
    );

    res.status(200).json({
      success: true,
      message: "Order placed successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Order failed" });
  }
};

/* ================= GET USER ORDERS ================= */
const getUserOrders = async (req, res) => {
  try {
    const userId = req.user.id;

    const orders = await orderCollection
      .find({ userId })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

module.exports = {
  regDataController,
  loginDataController,
  userProductController,
  getSingleProductController,
  userQueryController,
  saveCartDataController,
  searchController,
  getCartController,
  placeOrder,
  getUserOrders,
};
