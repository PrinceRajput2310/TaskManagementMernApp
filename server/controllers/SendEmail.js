import nodemailer from "nodemailer";

export const sendEmail = async (req, res) => {
  const { to, subject, text } = req.body;

  if (!to || !subject || !text) {
    return res.status(400).send({
      message: "Please provide all required fields: to, subject, text",
    });
  }

  // Create a transporter object using SMTP transport
  const transporter = nodemailer.createTransport({
    service: "gmail", // You can use any email service
    auth: {
      user: "ecommercemernapp@gmail.com",
      pass: "ECOMMERCEmern@2024",
    },
  });

  // Set up email options
  const mailOptions = {
    from: "ecommercemernapp@gmail.com",
    to: to,
    subject: subject,
    text: text,
  };

  try {
    // Send email
    await transporter.sendMail(mailOptions);
    return res.status(200).send({ message: "Email sent successfully" });
  } catch (error) {
    console.error(`Error sending email: ${error.message}`);
    return res.status(500).send({ message: "Error sending email" });
  }
};
