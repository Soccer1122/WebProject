import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
function Admin(props) {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetch("http://localhost:8080/books")
      .then((response) => response.json())
      .then((data) => setBooks(data))
      .catch((err) => console.log(err));
  }, []);
  const confirmDelete = (id) => {
    if (window.confirm("Are you sure?")) {
      // Call the delete API endpoint and update the state
      fetch(`http://localhost:8080/delete/${id}`, { method: "DELETE" })
        .then((response) => {
          if (response.ok) {
            // Update the state with the remaining books
            setBooks(books.filter((book) => book.id !== id));
          }
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <div className="container">
      <h2 className="text-center">Books List</h2><br/>      
      <div className="row">
        <button className="btn btn-primary" onClick={() => {navigate(`/books/${-1}`);}}>Add Book </button>
      </div>
      <table className="table table-striped table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Tiêu đề</th>
            <th>Tác giả</th>
            <th>Thể loại</th>
            <th>Ngày phát hành</th>
            <th>Số trang</th>
            <th>Sống lượng đã bán</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {books.map((book) => (
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.category}</td>
              <td>{book.releaseDate}</td>
              <td>{book.numberOfPages}</td>
              <td>{book.sold}</td>
              <td>
                <button className="btn btn-primary" onClick={() => {navigate(`/books/${book.id}`);}}>View</button>
                <button className="btn btn-danger" onClick={() => confirmDelete(book.id)}>Delete </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default Admin;
