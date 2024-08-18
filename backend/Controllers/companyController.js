import { Company } from "../Models/companyModel.js";

export const registerCompany = async (req, res) => {
  try {
    const { companyName } = req.body;
    if (!companyName) {
      return res.status(401).json({ message: "Company name is required" });
    }

    let company = await Company.findOne({ name: companyName });

    if (company) {
      return res
        .status(402)
        .json({ message: "You can't register existing company" });
    }

    company = await Company.create({
      name: companyName,
      userId: req.id,
    });

    return res
      .status(200)
      .json({ message: "Company registered successful", company });
  } catch (error) {
    console.log(error);
  }
};

export const getCompany = async (req, res) => {
  try {
    const userId = req.id; // logged in userid

    const companies = await Company.find({ userId });

    if (!companies) {
      return res.status(404).json({ message: "Companies not found" });
    }

    return res.status(200).json({companies})
  } catch (error) {
    console.log(error);
  }
};

// get company by id

export const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;

    const company = await Company.findById(companyId);

    if (!company) {
      return res.status(404).json({ message: "Company Not found" });
    }

    return res.status(200).json({company});
  } catch (error) {}
};

// update company

export const updateCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;

    const file = req.file;
    // cloudinary

    const updatedCompanyData = await Company.findByIdAndUpdate(
      req.params.id,
      { name, description, website, location },
      { new: true }
    );

    if (!updatedCompanyData) {
      return res.status(404).json({ message: "Company not found" });
    }

    return res.status(200).json({ message: "Company Details Updated" });
  } catch (error) {}
};
