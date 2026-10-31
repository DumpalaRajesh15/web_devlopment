function Contact() {
  return (
    <main className="page">
      <p className="tag">CONTACT TEA5 CAFE</p>

      <h1>
        Let's have a <span>cup of tea.</span>
      </h1>

      <form onSubmit={(e) => {
        e.preventDefault();
        alert("Message sent successfully!");
      }}>
        <input type="text" placeholder="Your Name" required />

        <input type="email" placeholder="Your Email" required />

        <textarea placeholder="Your Message" required></textarea>

        <button type="submit">Send Message →</button>
      </form>
    </main>
  );
}

export default Contact;