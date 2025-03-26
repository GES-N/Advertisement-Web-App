
import { ProductModel } from "../models/adsWebApp.js";
import { validateProduct, validateProductUpdate } from "../validators/adsWebApp.js";

//Add new advert
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
      vendor: req.auth.id
    });
    console.log(product)
    res.status(201).json({ message: "Advert Added" });

  } catch (error) {
    // console.log(error instanceof 'MongooseError')
    if (error.code === 11000) {
      return response.status(409).json(error.message);
    }
    next(error);
  }
};



//Fetch All Adverts
export const getAllAdverts = async (req, res, next) => {
  try {
    const { filter = "{}"} = req.query;
    const result = await ProductModel
    .find(JSON.parse(filter));
  
    return res.status(200).json(result);
  } catch (error) {
    next(error);
    
  }
  // try {
  //   const getAds = await ProductModel.find();
  //   res.status(200).json(getAds);
  // } catch (error) {
  //   next(error);
  // }
};

//Get advert by id
export const getAdvertById = async (req, res, next) => {
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
    const { error } = validateProductUpdate.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const id = req.params.id
    console.log("Id", id)
    const results = await ProductModel.findByIdAndUpdate(id, req.body, { new: true }
    );
    // Return a response
    if (!results) {
      return res.status(404).json({ message: "Advert not found" });
    }
    res.status(200).json({ results });
  } catch (error) {
    next(error);
  }
};


//Delete an Advert
export const deleteAdvert = async (req, res, next) => {
  try {
    const delAd = await ProductModel.findByIdAndDelete(req.params.id);
    if (!delAd) {
      return res.status(404).json({ message: "Advert not found" });
    }
    res.json({ message: "Advert removed" });
  } catch (error) {
    next(error);
  }
};