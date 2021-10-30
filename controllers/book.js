// create a reference to the model
let Book = require("../models/book");

// Gets all books from the Database and renders the page to list all books.
module.exports.bookList = function (req, res, next) {
  Book.find((err, bookList) => {
    // console.log(bookList);
    if (err) {
      return console.error(err);
    } else {
      res.render("book/list", {
        title: "Book List",
        books: bookList,
      });
    }
  });
};

// Gets a book by id and renders the details page.
module.exports.details = (req, res, next) => {
  let id = req.params.id;

  Book.findById(id, (err, bookToShow) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      //show the edit view
      res.render("book/details", {
        title: "Book Details",
        book: bookToShow,
      });
    }
  });
};

// Renders the Add form using the add_edit.ejs template
module.exports.displayAddPage = (req, res, next) => {
  // ADD YOUR CODE HERE
  res.render("book/add_edit", {
    title: "Book List",
    book: {},
    actionPath: "/book/add",
  });
};

// Processes the data submitted from the Add form to create a new book
module.exports.processAddPage = (req, res, next) => {
  // ADD YOUR CODE HERE
  let bookData = req.body;
  console.log(bookData);
  var book=new Book(bookData);
  book.save((error,data)=>{
      if(error){
          return console.error(error);
      }
      else{
          res.redirect('/book/list')
      }
  })
};

// Gets a book by id and renders the Edit form using the add_edit.ejs template
module.exports.displayEditPage = (req, res, next) => {
  // ADD YOUR CODE HERE
  let id=req.params.id;
  Book.findById(id,(error,bookInfo)=>{
      if(error){
          res.end(error);
      }
      else{
          res.render('book/add_edit',{book:bookInfo,title:"Edit book details",actionPath:"/book/edit/"+id  })
      }
  })
};

// Processes the data submitted from the Edit form to update a book
module.exports.processEditPage = (req, res, next) => {
  // ADD YOUR CODE HERE
  let id = req.params.id;
  let bookInfo = req.body;
  Book.findOneAndUpdate({_id:id},bookInfo,error=>{
      if(error) return console.error(error);
      else res.redirect('/book/list');
  })
};

// Deletes a book based on its id.
module.exports.performDelete = (req, res, next) => {
  // ADD YOUR CODE HERE
  let bookId = req.params.id;
  Book.deleteOne({ _id: bookId }, (err, data) => {
    if (err) {
      return console.error(err);
    } else {
      res.redirect("/book/list");
    }
  });
};
