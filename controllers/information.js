import Information from "../models/Information.js";

const informationController = {
  //Have the oppening hours
  findAllInformation: async (req, res) => {
    try {
      const informations = await Information.find();

      res.status(200).json({ informations });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};

export default informationController;
