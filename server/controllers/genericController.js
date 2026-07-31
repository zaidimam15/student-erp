// Generic CRUD controller factory.
// Given a Mongoose model, returns standard REST handlers (getAll, getOne, create, update, remove).
// This keeps the ~13 simple resource modules (Students, Notices, Timetable, etc.) consistent
// without duplicating boilerplate in every controller file.

const buildController = (Model, options = {}) => {
  const { searchFields = [], populate = [] } = options;

  const getAll = async (req, res) => {
    try {
      const { search, page = 1, limit = 100, sort = "-createdAt", ...filters } = req.query;

      const query = { ...filters };

      // remove empty filter values
      Object.keys(query).forEach((key) => {
        if (query[key] === "" || query[key] === undefined) delete query[key];
      });

      if (search && searchFields.length) {
        query.$or = searchFields.map((field) => ({
          [field]: { $regex: search, $options: "i" },
        }));
      }

      let mongoQuery = Model.find(query)
        .sort(sort)
        .limit(Number(limit))
        .skip((Number(page) - 1) * Number(limit));

      populate.forEach((p) => {
        mongoQuery = mongoQuery.populate(p);
      });

      const [data, total] = await Promise.all([mongoQuery, Model.countDocuments(query)]);

      res.json({ success: true, count: data.length, total, page: Number(page), data });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };

  const getOne = async (req, res) => {
    try {
      const doc = await Model.findById(req.params.id);
      if (!doc) return res.status(404).json({ success: false, message: "Record not found" });
      res.json({ success: true, data: doc });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };

  const create = async (req, res) => {
    try {
      const doc = await Model.create(req.body);
      res.status(201).json({ success: true, data: doc });
    } catch (error) {
      if (error.code === 11000) {
        return res.status(400).json({ success: false, message: "Duplicate record — a unique field already exists" });
      }
      res.status(400).json({ success: false, message: error.message });
    }
  };

  const update = async (req, res) => {
    try {
      const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!doc) return res.status(404).json({ success: false, message: "Record not found" });
      res.json({ success: true, data: doc });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  };

  const remove = async (req, res) => {
    try {
      const doc = await Model.findByIdAndDelete(req.params.id);
      if (!doc) return res.status(404).json({ success: false, message: "Record not found" });
      res.json({ success: true, message: "Record deleted successfully" });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };

  return { getAll, getOne, create, update, remove };
};

module.exports = buildController;
