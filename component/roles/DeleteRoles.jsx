import React, { useState } from "react";
import { Modal } from "antd";

export default function DeleteRoles({ children, record, onDelete }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  console.log(record);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    const copyRecord = {
      authorityId: Number(record.key),
    };

    await onDelete(copyRecord);

    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <a type="primary" onClick={showModal}>
        {children}
      </a>
      <Modal
        title="提示"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>此操作将永久删除所有角色下该菜单, 是否继续?</p>
      </Modal>
    </>
  );
}
