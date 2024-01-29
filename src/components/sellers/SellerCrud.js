// import axios from "axios";
// import React from "react";
// import { useEffect, useState } from "react";
// import { Container } from "react-bootstrap";

// function SellerCrud(props) {
//   const [id, setId] = useState("");
//   const [name, setName] = useState("");
//   const [role, setRole] = useState(false); // Assuming role is a boolean
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");
  
//   const [sellers, setSellers] = useState([]);

//   useEffect(() => { 
//     (async () => await loadSellers())();
//   }, []);

//   async function loadSellers() {
//     const result = await axios.get("https://localhost:7196/api/Seller/GetSeller");
//     setSellers(result.data);
//     console.log(result.data);
//   }

//   async function addSeller(event) {
//     event.preventDefault();
//     try {
//       await axios.post("https://localhost:7196/api/Seller/AddSeller", {
//         name: name,
//         role: role,
//         email: email,
//         password: password,
//         phoneNumber: phoneNumber,
//       });
//       alert("Seller added successfully");
//       clearForm();
//       loadSellers();
//     } catch (err) {
//       alert(err);
//     }
//   }

//   async function editSeller(seller) {
//     setId(seller.id);
//     setName(seller.name);
//     setRole(seller.role);
//     setEmail(seller.email);
//     setPassword(seller.password);
//     setPhoneNumber(seller.phoneNumber);
//   }

//   async function deleteSeller(id) {
//     await axios.delete("https://localhost:7196/api/Seller/DeleteSeller/" + id);
//     alert("Seller deleted successfully");
//     clearForm();
//     loadSellers();
//   }

//   async function updateSeller(event) {
//     event.preventDefault();
//     try {
//       await axios.patch(
//         `https://localhost:7196/api/Seller/UpdateSeller/${id}`,
//         {
//           id: id,
//           name: name,
//           role: role,
//           email: email,
//           password: password,
//           phoneNumber: phoneNumber,
//         }
//       );
//       alert("Seller updated successfully");
//       clearForm();
//       loadSellers();
//     } catch (err) {
//       alert(err);
//     }
//   }

//   const clearForm = () => {
//     setId("");
//     setName("");
//     setRole(false);
//     setEmail("");
//     setPassword("");
//     setPhoneNumber("");
//   };

//   return (
//     <Container>
//       <div>
//       <h1 style={{textAlign: "center"}}>Seller Details</h1>
//       <div className="container mt-4">
//         <form>
//           {/* Add form fields for all seller attributes */}
//           <div className="form-group">
//             <label>Seller Name</label>
//             <input
//               type="text"
//               className="form-control"
//               value={name}
//               onChange={(event) => setName(event.target.value)}
//             />
//           </div>
//           <div className="form-group">
//             <label>Role</label>
//             <input
//               type="checkbox"
//               className="form-control"
//               checked={role}
//               onChange={(event) => setRole(event.target.checked)}
//             />
//           </div>
//           <div className="form-group">
//             <label>Email</label>
//             <input
//               type="text"
//               className="form-control"
//               value={email}
//               onChange={(event) => setEmail(event.target.value)}
//             />
//           </div>
//           <div className="form-group">
//             <label>Password</label>
//             <input
//               type="password"
//               className="form-control"
//               value={password}
//               onChange={(event) => setPassword(event.target.value)}
//             />
//           </div>
//           <div className="form-group">
//             <label>Phone Number</label>
//             <input
//               type="text"
//               className="form-control"
//               value={phoneNumber}
//               onChange={(event) => setPhoneNumber(event.target.value)}
//             />
//           </div>
//           <div>
//             <button className="btn btn-primary mt-4" onClick={addSeller}>
//               Register
//             </button>
//             <button className="btn btn-warning mt-4" onClick={updateSeller}>
//               Update
//             </button>
//           </div>
//         </form>
//       </div>
//       <br />
//       <table className="table table-dark" align="center">
//         <thead>
//           <tr>
//             <th scope="col">Seller Id</th>
//             <th scope="col">Seller Name</th>
//             <th scope="col">Role</th>
//             <th scope="col">Email</th>
//             <th scope="col">Phone Number</th>
//             <th scope="col">Option</th>
//           </tr>
//         </thead>
//         {sellers.map((seller) => (
//           <tbody key={seller.id}>
//             <tr>
//               <th scope="row">{seller.id}</th>
//               <td>{seller.name}</td>
//               <td>{seller.role.toString()}</td>
//               <td>{seller.email}</td>
//               <td>{seller.phoneNumber}</td>
//               <td>
//                 <button
//                   type="button"
//                   className="btn btn-warning"
//                   onClick={() => editSeller(seller)}
//                 >
//                   Edit
//                 </button>
//                 <button
//                   type="button"
//                   className="btn btn-danger"
//                   onClick={() => deleteSeller(seller.id)}
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           </tbody>
//         ))}
//       </table>
//     </div>
//     </Container>
//   );
// }

// export default SellerCrud;
