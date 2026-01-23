const productCollection = require("../models/product");
const queryCollection = require("../models/query");
const nodemailer = require("nodemailer");
const Order = require("../models/orderModel");

const addadminProductController = async (req, res) => {
  try {
    const PImage = req.file.filename;
    const { Pname, Pdesc, Price, Cat } = req.body;

    if (!Pname || !Pdesc || !Price || !Cat) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const record = new productCollection({
      productName: Pname,
      productDescription: Pdesc,
      productPrice: Price,
      productCategory: Cat,
      productImage: PImage,
    });

    await record.save();

    res.status(200).json({ message: "Product added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const getAllProductController = async (req, res) => {
  try {
    const record = await productCollection.find();
    res.status(200).json({ data: record });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const deleteProductController = async (req, res) => {
  try {
    const productId = req.params.abc;
    await productCollection.findByIdAndDelete(productId);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const editValueDataController = async (req, res) => {
  try {
    const productId = req.params.abc;
    // correct Mongoose method is findById (capital B)
    const record = await productCollection.findById(productId);
    res.status(200).json({ data: record });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const productUpdateController = async (req, res) => {
  try {
    const { Pname, Pdesc, Pprice, Cat, Pstatus } = req.body;
    const productId = req.params.abc;
    await productCollection.findByIdAndUpdate(productId, {
      productName: Pname,
      productDescription: Pdesc,
      productPrice: Pprice,
      productCategory: Cat,
      productStatus: Pstatus,
    });
    res.status(200).json({ message: "successfully Update." });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const userAllQueryController = async (req, res) => {
  try {
    const record = await queryCollection.find();
    res.status(200).json({ data: record });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const queryDeleteController = async (req, res) => {
  try {
    const queryId = req.params.abc;
    await queryCollection.findByIdAndDelete(queryId);
    res.status(200).json({ message: "successfully deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const querySingleDataController = async (req, res) => {
  try {
    const queryId = req.params.abc;
    const record = await queryCollection.findById(queryId);
    res.status(200).json({ data: record });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const mailReplyController = async (req, res) => {
  try {
    const { to, sub, body } = req.body;
    const queryId = req.params.abc;

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "mariyamemon224@gmail.com",
        pass: "dvrz utuy peiw vrnf",
      },
    });

    const info = transporter.sendMail({
      from: '"WaslMart" <mariyamemon224@gmail.com>',
      to: to,
      subject: sub,
      text: body,
      html: body,
    });

    await queryCollection.findByIdAndUpdate(queryId, {
      QueryStatus: "Read",
    });

    res.status(200).json({ message: "Replied successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const adminOrderStatsController = async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    res.status(200).json({ totalOrders });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

module.exports = {
  addadminProductController,
  getAllProductController,
  deleteProductController,
  editValueDataController,
  productUpdateController,
  userAllQueryController,
  queryDeleteController,
  querySingleDataController,
  mailReplyController,
  adminOrderStatsController,
};
