const express = require('express');
const router = express.Router();
const businessController = require('../controllers/businessController');
const auth = require('../middlewares/verifyToken');

// CRUD de base
router.post('/', auth, businessController.createBusiness);
router.get('/', businessController.getAllBusinesses);
router.get('/:id', businessController.getBusinessById);
router.put('/:id', auth, businessController.updateBusiness);
router.delete('/:id', auth, businessController.deleteBusiness);

module.exports = router;
/**
 * @swagger
 * tags:
 *   name: Businesses
 *   description: Gestion des entreprises (hôtels, restaurants, services)
 */
/**
 * @swagger
 * /api/businesses:
 *  post: 
 *  summary: Créer une entreprise
 *  
 *  
 * requestBody:
 *    required: true
 *  content:
 *   application/json:
 *  schema:
 *   type: object 
 * *   required:
 *    - name    
 * *    - type
 * *    - description
 *  *   properties:
 *      name: 
 *       type: string
 * *       example: Mon Restaurant
 *      type:
 *      type: string
 * *      enum: [restaurant, hotel, service]
 * *      example: restaurant
 * *      description:
 * *      type: string
 * *      example: Un restaurant de cuisine française
 * *      createdBy:
 * *      type: string
 * *      description: ID de l'utilisateur qui a créé l'entreprise
 * *      example: 60c72b2f9b1e8c001c8e4d3a
 *  responses:  
 * *   201:
 * *     description: Entreprise créée avec succès
 * *   400:
 * *     description: Requête invalide
 * *   500:
 * *     description: Erreur serveur  
 * */