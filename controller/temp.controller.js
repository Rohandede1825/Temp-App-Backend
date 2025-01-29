import Temperature from '../models/temp.model.js';

// Add a new temperature entry
export const addTemperature = async (req, res) => {
  const { temperature, tempLimit = 30 } = req.body;

  if (temperature === undefined) {
    return res.status(400).json({ message: 'Temperature is required' });
  }

  try {
    let data = await Temperature.findOne().sort({ createdAt: -1 });

    if (data) {
      // Update existing record with new temperature and history
      data.temperature = temperature;
      data.tempLimit = tempLimit;
      data.history.push({ temperature }); // Ensure history is an array of objects

      await data.save();
      return res.status(200).json({
        temperature: data.temperature,
        tempLimit: data.tempLimit,
        history: data.history
      });
    }

    // Create new entry if no previous data exists
    const newTemperature = new Temperature({
      temperature,
      tempLimit,
      history: [{ temperature }]
    });

    const savedTemperature = await newTemperature.save();
    res.status(200).json({
      temperature: savedTemperature.temperature,
      tempLimit: savedTemperature.tempLimit,
      history: savedTemperature.history
    });
  } catch (error) {
    res.status(500).json({ message: 'Error saving temperature', error });
  }
};

// Get the latest temperature
export const getTemperature = async (req, res) => {
  try {
    const data = await Temperature.findOne().sort({ createdAt: -1 });

    if (!data) {
      return res.status(404).json({ message: 'No temperature data found' });
    }

    res.status(200).json({
      temperature: data.temperature,
      tempLimit: data.tempLimit,
      history: data.history
    });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving temperature', error });
  }
};
