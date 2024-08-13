


const ExpenseSchema = require("../models/ExpenseModel");

exports.addExpense = async (req, res) => {
    const { title, amount, category, description, date } = req.body;
    const expense = new ExpenseSchema({
        title,
        amount,
        category,
        description,
        date
    });
    try {
        if (!title || !category || !description || !date) {
            return res.status(400).json({ message: 'All Fields Are Required' });
        }
        if (amount <= 0 || typeof amount !== 'number') {
            return res.status(400).json({ message: 'Invalid Amount' });
        }
        await expense.save();
        res.status(200).json({ message: 'Expense Added Successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

exports.getExpense = async (req, res) => {
    try {
        const expenses = await ExpenseSchema.find().sort({ createdAt: -1 });
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

exports.deleteExpense = async (req, res) => {
    const { id } = req.params;
    try {
        await ExpenseSchema.findByIdAndDelete(id);
        res.status(200).json({ message: 'Expense Deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};
