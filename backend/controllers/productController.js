import Product from "../models/product.js";
import { isAdmin } from "./userController.js";

export async function createProduct(req, res) {
	// if (!isAdmin(req)) {
	// 	res.status(403).json({
	// 		message: "Access denied. Admins only.",
	// 	});
	// 	return;
	// }

	try {
        const productId = String(req.body.productId ?? "").trim();
        const name = String(req.body.name ?? "").trim();
        const category = String(req.body.category ?? "").trim();
        const altNames = Array.isArray(req.body.altNames)
            ? req.body.altNames.map((item) => String(item).trim()).filter(Boolean)
            : [];
        const price = Number(req.body.price);
        const labelledPrice = Number(req.body.labelledPrice);
        const stock = Number(req.body.stock ?? 0);
        const images = Array.isArray(req.body.images) && req.body.images.length > 0
            ? req.body.images
            : ["/images/default-product-01.png", "/images/default-product-02.png"];

        if (!productId || !name || !category) {
            res.status(400).json({
                message: "Product ID, name, and category are required.",
            });
            return;
        }

        if (Number.isNaN(price) || Number.isNaN(labelledPrice) || Number.isNaN(stock)) {
            res.status(400).json({
                message: "Price, labelled price, and stock must be valid numbers.",
            });
            return;
        }

		const existingProduct = await Product.findOne({
            productId,
		});

		if (existingProduct != null) {
			res.status(400).json({
				message: "Product with this productId already exists.",
			});
			return;
		}

		const newProduct = new Product({
            productId,
            name,
            altNames,
            price,
            labelledPrice,
            description: String(req.body.description ?? "").trim(),
            images,
            brand: String(req.body.brand ?? "").trim(),
            model: String(req.body.model ?? "").trim(),
            category,
            stock,
		});

		await newProduct.save();

		res.status(201).json({
			message: "Product created successfully.",
		});
	} catch (error) {
        if (error?.code === 11000) {
            res.status(400).json({
                message: "Product with this productId already exists.",
            });
            return;
        }

        if (error?.name === "ValidationError") {
            res.status(400).json({
                message: error.message,
            });
            return;
        }

        console.error("Error creating product:", error);
		res.status(500).json({
			message: "Error creating product",
		});
	}
}

export async function getAllProducts(req, res) {
    console.log("Fetching products....")
	try {
		if (isAdmin(req)) {
			const products = await Product.find();

			res.json(products);
		}else {
            const products = await Product.find({ isAvailable: true });
            res.json(products);
        }
	} catch (error) {
		res.status(500).json({
			message: "Error fetching products",
		});
	}
}

export async function deleteProduct(req, res) {
    if (!isAdmin(req)) {
        res.status(403).json({
            message: "Access denied. Admins only.",
        });
        return;
    }

    try{

        await Product.deleteOne({
            productId : req.params.productId
        })
        res.json({
            message: "Product deleted successfully.",
        });
        
    }catch(error){
        res.status(500).json({
            message: "Error deleting product",
        });
    }
}

export async function updateProduct(req,res){
    if (!isAdmin(req)) {
        res.status(403).json({
            message: "Access denied. Admins only.",
        });
        return;
    }

    try{

        await Product.updateOne({
            productId : req.params.productId
        },{
            name : req.body.name,
            altNames : req.body.altNames,
            price : req.body.price,
            labelledPrice : req.body.labelledPrice,
            description : req.body.description,
            images : req.body.images,
            brand : req.body.brand,
            model : req.body.model,
            category : req.body.category,
            stock : req.body.stock,
            isAvailble : req.body.isAvailble
        })

        res.json({
            message: "Product updated successfully."
        });
    }catch(error){
        res.status(500).json({
            message: "Error updating product",
        });
    }
}

export async function getProductById(req,res){
    try{
        const product = await Product.findOne({
            productId : req.params.productId
        })
        if(product == null){
            res.status(404).json({
                message : "Product not found"
            })
        }else{
            if(product.isAvailable){
                res.json(product)
            }else{
                if(isAdmin(req)){
                    res.json(product)
                }else{
                    res.status(403).json({
                        message : "Access denied. Admins only."
                    })
                }
            }
        }   
    }catch(error){
        res.status(500).json({
            message: "Error fetching product",
        });
    }
}

export async function searchProducts(req,res){

    try{

        const query = req.params.query;

        const products = await Product.find(
            {
                $or : [
                    { name : {$regex : query , $options: "i"}},
                    {description : {$regex : query , $options : "i"}},
                    {altNames : { $elemMatch : {$regex : query, $options : "i"} }}
                ]
            }
        )

        res.json(products);

    }catch(error){
        res.status(500).json({
            message: "Error searching products",
        });
    }

}