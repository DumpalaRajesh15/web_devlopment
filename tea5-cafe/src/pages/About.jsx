function About() {
  return (
    <main className="page">
      <p className="tag">ABOUT TEA5 CAFE</p>

      <h1>
        Your perfect cup of <span>tea.</span>
      </h1>

      <p className="description">
        At Tea5 Cafe, we believe every cup should bring comfort,
        freshness and a little happiness to your day.
      </p>

      <div className="cards">
        <div className="card">
          <h3>Fresh Tea</h3>
          <p>Freshly brewed tea with rich and delicious flavors.</p>
        </div>

        <div className="card">
          <h3>Tasty Treats</h3>
          <p>Perfect snacks and treats to enjoy with your tea.</p>
        </div>

        <div className="card">
          <h3>Cozy Place</h3>
          <p>A warm and relaxing space to meet and unwind.</p>
        </div>
      </div>
    </main>
  );
}

export default About;