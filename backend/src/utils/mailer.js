const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendEmail = async (to, subject, html) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      html
    };

    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Email sending failed:', error);
    throw error;
  }
};

const sendApplicationNotification = async (studentEmail, companyName, jobTitle) => {
  const subject = 'Application Submitted Successfully';
  const html = `
    <h2>Application Submitted Successfully</h2>
    <p>Your application for the position of <strong>${jobTitle}</strong> at <strong>${companyName}</strong> has been submitted successfully.</p>
    <p>You will be notified about the next steps in the selection process.</p>
    <p>Thank you for using the Placement Portal!</p>
  `;

  await sendEmail(studentEmail, subject, html);
};

const sendInterviewNotification = async (studentEmail, companyName, jobTitle, interviewDetails) => {
  const subject = 'Interview Scheduled';
  const html = `
    <h2>Interview Scheduled</h2>
    <p>Congratulations! You have been shortlisted for an interview.</p>
    <p><strong>Position:</strong> ${jobTitle}</p>
    <p><strong>Company:</strong> ${companyName}</p>
    <p><strong>Date & Time:</strong> ${interviewDetails.scheduledAt}</p>
    <p><strong>Mode:</strong> ${interviewDetails.mode}</p>
    <p><strong>Location:</strong> ${interviewDetails.location}</p>
    <p>Please prepare well and arrive on time. Good luck!</p>
  `;

  await sendEmail(studentEmail, subject, html);
};

module.exports = {
  sendEmail,
  sendApplicationNotification,
  sendInterviewNotification
};
