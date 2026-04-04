# WhatsApp Prescription MVP Experiment

This project is a minimal Next.js application designed to test WhatsApp image previews for prescription sharing.

## Setup

1.  Navigate to this directory:
    ```bash
    cd "Whatssap integration/Whattssap Experiment/prescription-mvp"
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Run locally (Note: WhatsApp previews won't work on localhost):
    ```bash
    npm run dev
    ```

## Deployment for Testing

WhatsApp requires a public HTTPS URL to fetch Open Graph meta tags and display the image preview.

1.  Push this folder to a GitHub repository.
2.  Connect the repository to [Vercel](https://vercel.com).
3.  Once deployed, update the `baseUrl` in `app/page.js` if necessary (it currently attempts to detect it automatically).

## Testing Flow

1.  Open the deployed URL.
2.  Enter your phone number (including country code).
3.  Click **Send on WhatsApp**.
4.  Verify that the WhatsApp message includes a big image preview of the prescription.
