const mongoose = require('mongoose');
const User = require('../models/User');
const Student = require('../models/Student');
const Company = require('../models/Company');
const Job = require('../models/Job');
const Application = require('../models/Application');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/placement-portal', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const seedData = async () => {
  try {
    console.log('Starting database seeding...');

    // Clear existing data
    await User.deleteMany({});
    await Student.deleteMany({});
    await Company.deleteMany({});
    await Job.deleteMany({});
    await Application.deleteMany({});

    console.log('Cleared existing data');

    // Create admin user
    const adminUser = new User({
      email: 'admin@placementportal.com',
      password: 'admin123',
      role: 'admin'
    });
    await adminUser.save();
    console.log('Created admin user');

    // Create sample students
    const students = [
      {
        email: 'john.doe@student.com',
        password: 'student123',
        prn: 'PRN001',
        firstName: 'John',
        lastName: 'Doe',
        phone: '9876543210',
        department: 'Computer Science',
        year: 'Final Year',
        cgpa: 8.5,
        skills: ['JavaScript', 'React', 'Node.js', 'MongoDB', 'Python'],
        bio: 'Passionate about web development and machine learning'
      },
      {
        email: 'jane.smith@student.com',
        password: 'student123',
        prn: 'PRN002',
        firstName: 'Jane',
        lastName: 'Smith',
        phone: '9876543211',
        department: 'Information Technology',
        year: 'Final Year',
        cgpa: 9.2,
        skills: ['Java', 'Spring Boot', 'MySQL', 'AWS', 'Docker'],
        bio: 'Full-stack developer with expertise in Java ecosystem'
      },
      {
        email: 'mike.johnson@student.com',
        password: 'student123',
        prn: 'PRN003',
        firstName: 'Mike',
        lastName: 'Johnson',
        phone: '9876543212',
        department: 'Electronics',
        year: 'Third Year',
        cgpa: 7.8,
        skills: ['C++', 'Arduino', 'Embedded Systems', 'IoT'],
        bio: 'Electronics enthusiast with IoT development experience'
      }
    ];

    for (const studentData of students) {
      const user = new User({
        email: studentData.email,
        password: studentData.password,
        role: 'student'
      });
      await user.save();

      const student = new Student({
        userId: user._id,
        prn: studentData.prn,
        firstName: studentData.firstName,
        lastName: studentData.lastName,
        phone: studentData.phone,
        department: studentData.department,
        year: studentData.year,
        cgpa: studentData.cgpa,
        skills: studentData.skills,
        bio: studentData.bio
      });
      await student.save();
    }
    console.log('Created sample students');

    // Create sample companies
    const companies = [
      {
        email: 'hr@techcorp.com',
        password: 'company123',
        companyName: 'TechCorp Solutions',
        contactPerson: 'Sarah Wilson',
        phone: '9876543220',
        industry: 'Information Technology',
        companySize: 'Large (201-1000)',
        website: 'https://techcorp.com',
        description: 'Leading technology company specializing in software development and digital transformation.',
        isVerified: true
      },
      {
        email: 'contact@startupxyz.com',
        password: 'company123',
        companyName: 'StartupXYZ',
        contactPerson: 'David Brown',
        phone: '9876543221',
        industry: 'Software Development',
        companySize: 'Startup (1-10)',
        website: 'https://startupxyz.com',
        description: 'Innovative startup focused on AI and machine learning solutions.',
        isVerified: false
      },
      {
        email: 'info@globaltech.com',
        password: 'company123',
        companyName: 'GlobalTech Industries',
        contactPerson: 'Lisa Davis',
        phone: '9876543222',
        industry: 'Manufacturing',
        companySize: 'Enterprise (1000+)',
        website: 'https://globaltech.com',
        description: 'Global manufacturing company with focus on automation and smart technologies.',
        isVerified: true
      }
    ];

    for (const companyData of companies) {
      const user = new User({
        email: companyData.email,
        password: companyData.password,
        role: 'company'
      });
      await user.save();

      const company = new Company({
        userId: user._id,
        companyName: companyData.companyName,
        contactPerson: companyData.contactPerson,
        phone: companyData.phone,
        industry: companyData.industry,
        companySize: companyData.companySize,
        website: companyData.website,
        description: companyData.description,
        isVerified: companyData.isVerified
      });
      await company.save();
    }
    console.log('Created sample companies');

    // Create sample jobs
    const companiesInDb = await Company.find();
    
    const jobs = [
      {
        companyId: companiesInDb[0]._id,
        title: 'Full Stack Developer Intern',
        description: 'We are looking for a passionate full-stack developer intern to join our team. You will work on exciting projects using modern technologies.',
        type: 'Internship',
        duration: '6 months',
        stipend: { min: 15000, max: 25000 },
        location: 'Mumbai',
        workMode: 'Hybrid',
        requiredSkills: ['JavaScript', 'React', 'Node.js', 'MongoDB'],
        preferredSkills: ['TypeScript', 'AWS', 'Docker'],
        eligibility: {
          departments: ['Computer Science', 'Information Technology'],
          year: ['Final Year', 'Third Year'],
          minCGPA: 7.0
        },
        applicationDeadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
        startDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000), // 45 days from now
        maxApplications: 50,
        isPlacementOpportunity: true
      },
      {
        companyId: companiesInDb[1]._id,
        title: 'AI/ML Engineer Intern',
        description: 'Join our AI team to work on cutting-edge machine learning projects. Great opportunity to learn and contribute to innovative solutions.',
        type: 'Internship',
        duration: '3 months',
        stipend: { min: 10000, max: 20000 },
        location: 'Bangalore',
        workMode: 'Remote',
        requiredSkills: ['Python', 'Machine Learning', 'Data Science'],
        preferredSkills: ['TensorFlow', 'PyTorch', 'AWS'],
        eligibility: {
          departments: ['Computer Science', 'Information Technology'],
          year: ['Final Year'],
          minCGPA: 8.0
        },
        applicationDeadline: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000),
        startDate: new Date(Date.now() + 35 * 24 * 60 * 60 * 1000),
        maxApplications: 30,
        isPlacementOpportunity: true
      },
      {
        companyId: companiesInDb[2]._id,
        title: 'Embedded Systems Intern',
        description: 'Work on IoT and embedded systems projects. Hands-on experience with microcontrollers and sensor integration.',
        type: 'Internship',
        duration: '4 months',
        stipend: { min: 12000, max: 18000 },
        location: 'Pune',
        workMode: 'On-site',
        requiredSkills: ['C++', 'Arduino', 'Embedded Systems'],
        preferredSkills: ['IoT', 'Raspberry Pi', 'Circuit Design'],
        eligibility: {
          departments: ['Electronics', 'Computer Science'],
          year: ['Final Year', 'Third Year'],
          minCGPA: 7.5
        },
        applicationDeadline: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000),
        startDate: new Date(Date.now() + 40 * 24 * 60 * 60 * 1000),
        maxApplications: 25,
        isPlacementOpportunity: false
      }
    ];

    for (const jobData of jobs) {
      const job = new Job(jobData);
      await job.save();

      // Add job to company's jobs list
      const company = await Company.findById(jobData.companyId);
      company.jobsPosted.push(job._id);
      await company.save();
    }
    console.log('Created sample jobs');

    // Create sample applications
    const studentsInDb = await Student.find();
    const jobsInDb = await Job.find();

    const applications = [
      {
        studentId: studentsInDb[0]._id,
        jobId: jobsInDb[0]._id,
        status: 'Applied',
        coverLetter: 'I am very interested in this position and believe my skills align well with your requirements.',
        resume: 'resume-url-1'
      },
      {
        studentId: studentsInDb[1]._id,
        jobId: jobsInDb[0]._id,
        status: 'Shortlisted',
        coverLetter: 'I have extensive experience in full-stack development and am excited about this opportunity.',
        resume: 'resume-url-2'
      },
      {
        studentId: studentsInDb[0]._id,
        jobId: jobsInDb[1]._id,
        status: 'Applied',
        coverLetter: 'I am passionate about AI/ML and would love to contribute to your innovative projects.',
        resume: 'resume-url-1'
      }
    ];

    for (const appData of applications) {
      const application = new Application(appData);
      await application.save();

      // Update job application count
      const job = await Job.findById(appData.jobId);
      job.currentApplications += 1;
      job.applications.push(application._id);
      await job.save();

      // Add application to student's applications
      const student = await Student.findById(appData.studentId);
      student.applications.push(application._id);
      await student.save();
    }
    console.log('Created sample applications');

    console.log('Database seeding completed successfully!');
    console.log('\nSample accounts created:');
    console.log('Admin: admin@placementportal.com / admin123');
    console.log('Student: john.doe@student.com / student123');
    console.log('Company: hr@techcorp.com / company123');

  } catch (error) {
    console.error('Seeding error:', error);
  } finally {
    mongoose.connection.close();
  }
};

seedData();
