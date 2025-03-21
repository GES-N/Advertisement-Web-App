import Product from "../models/adsWebApp.js";

// 📌 Create a Product (Only for Vendors)
export const createProduct = async (req, res) => {
  try {
    if (req.user.role !== "vendor") {
      return res.status(403).json({ message: "Access denied. Vendors only." });
    }

    const { productName, description, price, category, stockQuantity } = req.body;
    const images = req.files?.map(file => file.path) || [];

    // Validate required fields
    if (!productName || !description || !price || !category || !stockQuantity) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Create product
    const product = await Product.create({
      vendor: req.user.id,
      productName,
      description,
      price,
      category,
      images,
      stockQuantity,
      availabilityStatus: stockQuantity > 0,
    });

    res.status(201).json({ message: "Product created successfully", product });
  } catch (error) {
    res.status(500).json({ message: "Error creating product", error: error.message });
  }
};

// 📌 Get All Products
export const getProducts = async (req, res) => {
  try {
    const { filter = "{}", sort = "{}" } = req.query;
    const products = await Product.find(JSON.parse(filter)).sort(JSON.parse(sort));
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error: error.message });
  }
};

// 📌 Get a Single Product by ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Error fetching product", error: error.message });
  }
};

// 📌 Update a Product (Only for Vendors)
export const updateProduct = async (req, res) => {
  try {
    if (req.user.role !== "vendor") {
      return res.status(403).json({ message: "Access denied. Vendors only." });
    }

    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedProduct) return res.status(404).json({ message: "Product not found" });

    res.json({ message: "Product updated successfully", updatedProduct });
  } catch (error) {
    res.status(500).json({ message: "Error updating product", error: error.message });
  }
};

// 📌 Delete a Product (Only for Vendors)
export const deleteProduct = async (req, res) => {
  try {
    if (req.user.role !== "vendor") {
      return res.status(403).json({ message: "Access denied. Vendors only." });
    }

    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product", error: error.message });
  }
};
