const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  Category.findAll().then((categoryData) => {
    res.json(categoryData);
  });
});

router.get('/:id', (req, res) => {
  Category.findOne({
    where: {
      id: req.params.id
    },
    include: {
      model: Product,
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
    }
    }).then((categoryData) => {
      if(!categoryData) {
        res.status(404).json({message: 'No Categorie found'});
        return;
      }
    res.json(categoryData);
  });
});

router.post('/', (req, res) => {
  Category.create(req.body)
  .then((newCatergory) => {
    res.json(newCatergory);
  })
  .catch((err) => {
    res.json(err);
  });
});

router.put('/:id', (req, res) => {
  Category.update(req.body,
    {
      where: {
        id: req.params.id,
      }
    }
  )
    .then(updatedCategory => {
      if(!updatedCategory) {
        res.status(404).json({message: 'no category found'})
      }
      res.json(updatedCategory);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((deleteCategory) => {
      res.json(deleteCategory);
    })
    .catch((err) => res.status(500).json(err));
});

module.exports = router;
