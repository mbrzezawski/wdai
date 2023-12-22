import React, { useState } from 'react';

const EditProductModal =  ({product, onSave, onCancel }) => {
    const [editedTitle, setEditedTitle] = useState(product.title);
    const [editedDescription, setEditedDescription] = useState(product.description);
    const [editedPrice, setEditedPrice] = useState(product.price);

    const handleSave = () => {
        const editedProduct = {
            ...product,
            title: editedTitle,
            description: editedDescription,
            price: editedPrice,
        };
        onSave(editedProduct);
    };
    return (
        <div className="edit-product-modal">
            <h2>EDYTUJ PRODUKT</h2>
            <label>Title:</label>
            <input
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
            />
            <label>Opis:</label>
            <input
                type="text"
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
            />
            <label>Cena:</label>
            <input
                type="text"
                value={editedPrice}
                onChange={(e) => setEditedPrice(e.target.value)}
            />
            <button onClick={handleSave}>Zapisz</button>
            <button onClick={onCancel}>Anuluj</button>
        </div>
    );
};
export default EditProductModal;