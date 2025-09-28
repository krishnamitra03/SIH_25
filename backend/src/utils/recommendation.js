const Student = require('../models/Student');
const Job = require('../models/Job');

const calculateJobMatchScore = (student, job) => {
  let score = 0;
  let totalWeight = 0;

  // Skills matching (40% weight)
  const skillWeight = 40;
  totalWeight += skillWeight;
  
  const studentSkills = student.skills.map(skill => skill.toLowerCase());
  const requiredSkills = job.requiredSkills.map(skill => skill.toLowerCase());
  const preferredSkills = job.preferredSkills.map(skill => skill.toLowerCase());
  
  const requiredMatches = requiredSkills.filter(skill => 
    studentSkills.some(studentSkill => studentSkill.includes(skill) || skill.includes(studentSkill))
  ).length;
  
  const preferredMatches = preferredSkills.filter(skill => 
    studentSkills.some(studentSkill => studentSkill.includes(skill) || skill.includes(studentSkill))
  ).length;
  
  const skillScore = ((requiredMatches / requiredSkills.length) * 0.7 + 
                     (preferredMatches / preferredSkills.length) * 0.3) * skillWeight;
  score += skillScore;

  // CGPA matching (20% weight)
  const cgpaWeight = 20;
  totalWeight += cgpaWeight;
  
  if (student.cgpa >= job.eligibility.minCGPA) {
    const cgpaScore = Math.min((student.cgpa / 10) * cgpaWeight, cgpaWeight);
    score += cgpaScore;
  }

  // Department matching (20% weight)
  const deptWeight = 20;
  totalWeight += deptWeight;
  
  if (job.eligibility.departments.includes('All') || 
      job.eligibility.departments.includes(student.department)) {
    score += deptWeight;
  }

  // Year matching (20% weight)
  const yearWeight = 20;
  totalWeight += yearWeight;
  
  if (job.eligibility.year.includes(student.year)) {
    score += yearWeight;
  }

  return totalWeight > 0 ? Math.round((score / totalWeight) * 100) : 0;
};

const getRecommendedJobs = async (studentId, limit = 10) => {
  try {
    const student = await Student.findById(studentId);
    if (!student) {
      throw new Error('Student not found');
    }

    const jobs = await Job.find({ 
      status: 'Active',
      applicationDeadline: { $gt: new Date() }
    }).populate('companyId', 'companyName industry logo');

    const jobsWithScores = jobs.map(job => ({
      job: job,
      matchScore: calculateJobMatchScore(student, job)
    }));

    // Sort by match score and return top recommendations
    return jobsWithScores
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, limit)
      .map(item => ({
        ...item.job.toObject(),
        matchScore: item.matchScore
      }));
  } catch (error) {
    console.error('Get recommended jobs error:', error);
    throw error;
  }
};

const getRecommendedStudents = async (jobId, limit = 20) => {
  try {
    const job = await Job.findById(jobId).populate('companyId', 'companyName');
    if (!job) {
      throw new Error('Job not found');
    }

    const students = await Student.find({
      isPlaced: false,
      department: { $in: job.eligibility.departments },
      year: { $in: job.eligibility.year },
      cgpa: { $gte: job.eligibility.minCGPA }
    });

    const studentsWithScores = students.map(student => ({
      student: student,
      matchScore: calculateJobMatchScore(student, job)
    }));

    // Sort by match score and return top recommendations
    return studentsWithScores
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, limit)
      .map(item => ({
        ...item.student.toObject(),
        matchScore: item.matchScore
      }));
  } catch (error) {
    console.error('Get recommended students error:', error);
    throw error;
  }
};

module.exports = {
  calculateJobMatchScore,
  getRecommendedJobs,
  getRecommendedStudents
};
