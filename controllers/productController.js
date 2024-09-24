const Product = require('../models/product');
const User = require('../models/User');

exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.buyProduct = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        const product = await Product.findById(req.body.productId);

        if (user.coins < product.price) {
            return res.status(400).json({ message: 'Not enough coins' });
        }

        user.coins -= product.price;
        await user.save();
        
        res.status(200).json({ message: 'Product purchased successfully' });
    } catch (error) {
        console.error('Error purchasing product:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
