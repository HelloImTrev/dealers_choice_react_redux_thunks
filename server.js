//DATA LAYER
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize(process.env.DATABASE_URL || "postgres://localhost/dealers_books");

const Book = sequelize.define("book", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
    },
  },
  authorId: {
    type: DataTypes.INTEGER,
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

Book.belongsTo(Author);
Author.hasMany(Book);

const init = async () => {
  try {
    await sequelize.sync({ force: true });

    const [rowling, tolken, king] = await Promise.all([
      Author.create({ name: "J.K Rowling" }),
      Author.create({ name: "J. R. R. Tolken" }),
      Author.create({ name: "Stephen King" }),
    ]);

    await Promise.all([
      Book.create({
        title: "The Lord of the Rings: Fellowship of the Ring",
        authorId: tolken.id,
      }),
      Book.create({
        title: "Misery",
        authorId: king.id,
      }),
      Book.create({
        title: "Harry Potter and the Goblet of Fire",
        authorId: rowling.id,
      }),
      Book.create({
        title: "Harr Potter and the Order of Azkaban",
        authorId: rowling.id,
      }),
    ]);
  } catch (e) {
    console.log(e);
  }
};

init();

//EXPRESS APP
const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

app.use("/dist", express.static(path.join(__dirname, "dist")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.delete("/api/books/:id", async (req, res, next) => {
  try {
    const deletedBook = await Book.findByPk(req.params.id);
    await deletedBook.destroy();
    res.sendStatus(204);
  } catch (e) {
    next(e);
  }
});

app.get("/api/books", async (req, res, next) => {
  try {
    await res.send(
      await Book.findAll({
        include: [Author],
      })
    );
  } catch (e) {
    next(e);
  }
});

app.get("/api/authors", async (req, res, next) => {
  try {
    await res.send(await Author.findAll({}));
  } catch (e) {
    next(e);
  }
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
