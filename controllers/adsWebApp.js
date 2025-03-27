import { ProductModel } from "../models/adsWebApp.js";
import {
  validateProduct,
  validateProductUpdate,
} from "../validators/adsWebApp.js";

export const addAdvert = async (req, res, next) => {
  try {
    const { error, value } = validateProduct.validate({
      ...req.body,
      images: req.files?.map((file) => {
        return file.filename;
      }),
    });

    if (error) {
      return res.status(422).json(error);
    }

    const product = await ProductModel.create({
      ...value,
      vendor: req.auth.id,
    });

    res.status(201).json({ message: "Advert Added", product });
  } catch (error) {
    if (error.code === 11000) {
      return response.status(409).json(error.message);
    }
    next(error);
  }
};

//Fetch All Adverts
export const getAllAdverts = async (req, res, next) => {
  try {
    const { filter = "{}" } = req.query;
    const result = await ProductModel.find(JSON.parse(filter));

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

//Get adverts related to a vendor
export const getAdvertById = async (req, res, next) => {
  try {
    const advert = await ProductModel.find({ vendor: req.auth.id });

    if (advert) {
      res.status(200).json(advert);
    } else {
      res.status(404).json({ message: "Advert not found" });
    }
  } catch (error) {
    next(error);
  }
};

//Get a single product
export const getAdvert = async (req, res, next) => {
  try {
    const advert = await ProductModel.findById(req.params.id);
    if (advert) {
      res.status(200).json(advert);
    } else {
      res.status(404).json({ message: "Advert not found" });
    }
  } catch (error) {
    next(error);
  }
};


//Update an advert
export const updateAdvert = async (req, res, next) => {
  try {
    const { error } = validateProductUpdate.validate({});
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const id = req.params.id;

    const result = await ProductModel.findOne({
      _id: id,
      vendor: req.auth.id,
    });
    if (!result) {
      return res.status(404).json({ message: "Advert not found" });
    }

    const results = await ProductModel.findByIdAndUpdate(result.id, req.body, {
      new: true,
    });

    res.status(200).json({ results });
  } catch (error) {
    next(error);
  }
};


//delete an advert
export const delAdvert = async (req, res, next) => {
  const delAd = await ProductModel.findByIdAndDelete({
    _id: req.params.id,
  });
  if (!delAd) {
    return res.status(404).json({ message: "Advert not found" });
  }
  res.json({ message: "Advert removed" });
};

//Delete an  Advert related to a vendor
export const deleteAdvert = async (req, res, next) => {
  try {
    const id = req.params.id;
    const delAd = await ProductModel.findOne({
      _id: id,
      vendor: req.auth.id,
    });

    if (!delAd) {
      return res.status(404).json({ message: "Advert not found" });
    }

    await ProductModel.findByIdAndDelete(delAd.id);

    res.json({ message: "Advert removed" });
  } catch (error) {
    next(error);
  }
};
