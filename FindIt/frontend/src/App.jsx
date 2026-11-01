
import { useEffect, useState } from "react";
import "./App.css";

const API = "http://localhost:5000";

function App() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("Lost");
  const [image, setImage] = useState(null);

  const [form, setForm] = useState({
    name: "",
    description: "",
    location: "",
    contact: "",
    type: "Lost"
  });

  const loadItems = async () => {
    try {
      const res = await fetch(`${API}/items`);
      if (!res.ok) throw new Error("Unable to load items");
      setItems(await res.json());
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    Object.entries(form).forEach(([key, value]) => {
      data.append(key, value);
    });

    if (image) data.append("image", image);

    try {
      const res = await fetch(`${API}/items`, {
        method: "POST",
        body: data
      });

      if (!res.ok) throw new Error("Submission failed");

      alert("Item reported successfully!");

      setForm({
        name: "",
        description: "",
        location: "",
        contact: "",
        type: "Lost"
      });

      setImage(null);
      e.target.reset();
      loadItems();

    } catch (err) {
      alert(err.message);
    }
  };

  const markReturned = async (id) => {
    if (!window.confirm("Has this item been returned to its owner?")) {
      return;
    }

    try {
      const res = await fetch(`${API}/items/${id}/return`, {
        method: "PATCH"
      });

      if (!res.ok) throw new Error("Unable to update status");

      alert("Item marked as returned!");
      loadItems();
    } catch (err) {
      alert(err.message);
    }
  };

  const filteredItems = items.filter(item => {
    const text = search.toLowerCase();

    return (
      item.type === type &&
      (
        item.name.toLowerCase().includes(text) ||
        item.location.toLowerCase().includes(text)
      )
    );
  });

  const lostCount = items.filter(
    item => item.type === "Lost" && item.status === "Active"
  ).length;

  const foundCount = items.filter(
    item => item.type === "Found" && item.status === "Active"
  ).length;

  return (
    <div className="app">

      <nav className="navbar">
        <h2>Find<span>It</span></h2>
        <a href="#report">Report Item</a>
      </nav>

      <section className="hero">
        <h1>Lost Something? Found Something?</h1>
        <p>FindIt helps lost items find their way home.</p>
        <a href="#report" className="hero-btn">
          Report an Item
        </a>
      </section>

      <section className="stats">
        <div>
          <h2>{lostCount}</h2>
          <p>Active Lost Items</p>
        </div>
        <div>
          <h2>{foundCount}</h2>
          <p>Active Found Items</p>
        </div>
        <div>
          <h2>{items.filter(i => i.status === "Returned").length}</h2>
          <p>Items Returned</p>
        </div>
      </section>

      <section className="report" id="report">
        <h2>Report an Item</h2>

        <form onSubmit={handleSubmit}>

          <input
            placeholder="Item Name"
            required
            value={form.name}
            onChange={e =>
              setForm({...form, name: e.target.value})
            }
          />

          <textarea
            placeholder="Describe the item"
            required
            value={form.description}
            onChange={e =>
              setForm({...form, description: e.target.value})
            }
          />

          <input
            placeholder="Where was it lost or found?"
            required
            value={form.location}
            onChange={e =>
              setForm({...form, location: e.target.value})
            }
          />

          <input
            placeholder="Contact Number"
            type="tel"
            pattern="[0-9]{10}"
            maxLength="10"
            required
            value={form.contact}
            onChange={e =>
              setForm({...form, contact: e.target.value})
            }
          />

          <select
            value={form.type}
            onChange={e =>
              setForm({...form, type: e.target.value})
            }
          >
            <option value="Lost">Lost Item</option>
            <option value="Found">Found Item</option>
          </select>

          <input
            type="file"
            accept="image/*"
            onChange={e => setImage(e.target.files[0])}
          />

          <button type="submit">Submit Report</button>
        </form>
      </section>

      <section className="listings">
        <h2>Explore Items</h2>

        <input
          className="search"
          placeholder="Search by item name or location..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        <div className="tabs">
          <button
            className={type === "Lost" ? "active" : ""}
            onClick={() => setType("Lost")}
          >
            Lost Items
          </button>

          <button
            className={type === "Found" ? "active" : ""}
            onClick={() => setType("Found")}
          >
            Found Items
          </button>
        </div>

        <div className="items">
          {filteredItems.length === 0 ? (
            <p>No matching items found.</p>
          ) : (
            filteredItems.map(item => (
              <div className="card" key={item._id}>

                {item.image && (
                  <img
                    src={`${API}/uploads/${item.image}`}
                    alt={item.name}
                  />
                )}

                <div className="card-content">

                  <span className={item.type === "Lost" ? "lost" : "found"}>
                    {item.type}
                  </span>

                  <span className={
                    item.status === "Returned" ? "returned" : "active-status"
                  }>
                    {item.status}
                  </span>

                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <p><b>Location:</b> {item.location}</p>
                  <p><b>Contact:</b> {item.contact}</p>

                  {item.status === "Active" && (
                    <button
                      className="return-btn"
                      onClick={() => markReturned(item._id)}
                    >
                      Mark as Returned
                    </button>
                  )}

                </div>
              </div>
            ))
          )}
        </div>
      </section>

      <footer>
        <p>© 2026 FindIt | Lost and Found Portal</p>
      </footer>

    </div>
  );
}

export default App;
