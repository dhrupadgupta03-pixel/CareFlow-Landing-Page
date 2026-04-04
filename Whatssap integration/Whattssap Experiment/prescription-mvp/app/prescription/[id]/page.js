export default function PrescriptionPage({ params }) {
  const imageUrl = "https://res.cloudinary.com/dharxchac/image/upload/v1774522651/WhatsApp_Image_2026-03-24_at_9.05.53_PM_spqksr.jpg";

  return (
    <>
      <head>
        <title>Prescription</title>
        <meta property="og:title" content="Prescription" />
        <meta property="og:description" content="From your doctor" />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </head>
      <div style={{ padding: "20px", textAlign: "center", fontFamily: "sans-serif" }}>
        <h1>Your Prescription</h1>
        <p>From your doctor</p>
        <img 
          src={imageUrl} 
          alt="Prescription" 
          style={{ maxWidth: "100%", borderRadius: "8px", boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }} 
        />
        <br />
        <a 
          href={imageUrl} 
          download 
          target="_blank"
          style={{ display: "inline-block", marginTop: "20px", padding: "10px 20px", background: "#0070f3", color: "white", borderRadius: "5px", textDecoration: "none", fontWeight: "bold" }}
        >
          Download / Save Image
        </a>
      </div>
    </>
  );
}
