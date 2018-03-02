// get book image if exists
export function getImg(book) {
  if (book.imageLinks) {
    return `url(${book.imageLinks.thumbnail})`;
  } else {
    return "";
  }
}

export function getShelf(book) {
  if (book.shelf) {
    return book.shelf;
  } else {
    return "none";
  }
}
