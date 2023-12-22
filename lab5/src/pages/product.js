import React, { useState } from 'react';
import EditProductModal from "./edit-product";

function Product({ product, onEdit }) {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const openEditModal = () => {
        setIsEditModalOpen(true);
    };

    const closeEditModal = () => {
        setIsEditModalOpen(false);
    };

    const handleSaveEdit = (editedProduct) => {
        onEdit(editedProduct);
        closeEditModal();
    };

    return (
        <div className="product">
            <img src={product.thumbnail} alt={product.title} />
            <div className="product-info">
                <h2>{product.title}</h2>
                <p>{product.description} Cena:{product.price}$</p>
                <button onClick={openEditModal}>EDYTUJ</button>
            </div>
            {isEditModalOpen && (
                <EditProductModal
                    product={product}
                    onSave={handleSaveEdit}
                    onCancel={closeEditModal}
                />
            )}
        </div>
    );
}

export default Product