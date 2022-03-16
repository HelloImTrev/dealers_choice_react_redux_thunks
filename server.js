//DATA LAYER
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("postgres://localhost/dealers_books");

const Book = sequelize.define("book", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
    },
  },
});

const Author = sequelize.define("author", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
    },
  },
});

const init = async () => {
  try {
    await sequelize.sync({ force: true });

    Promise.all([
      Author.create({ name: "J.K Rowling" }),
      Author.create({ name: "J. R. R. Tolken" }),
      Author.create({ name: "Stephen King" }),
      Book.create({ title: "The Lord of the Rings: Fellowship of the Ring" }),
      Book.create({ title: "Misery" }),
      Book.create({ title: "Harry Potter and the Goblet of Fire" }),
      Book.create({ title: "Harr Potter and the Order of Azkaban" }),
    ]);
  } catch (e) {
    console.log(e);
  }
};

init();

//EXPRESS LAYER
const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

app.use("/dist", express.static(path.join(__dirname, "dist")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
