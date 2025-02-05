import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { RootState } from "@/store/store";
import { createAdmin, getUserList, toggleUser, DeleteUser, updateUser } from "@/store/userSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  const { users } = useSelector((state: RootState) => state.user);
  const dispatch: any = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "Admin",
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false); // Add state for Edit Dialog
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    dispatch(getUserList());
  }, [dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    dispatch(createAdmin(formData));
    setIsDialogOpen(false);
  };

  const toggleStatus = (userId: string, value: boolean) => {
    dispatch(toggleUser(userId, value));
  };

  const handleEdit = (user: any) => {
    setFormData({
      name: user.name,
      email: user.email,
      password: "", // You may want to handle this differently
      role: user.role,
    });
    setUserId(user._id);
    setIsEditDialogOpen(true); // Open the edit dialog
  };

  const handleSubmitEdit = () => {
    if (userId) {
      const updatedData = {
        name: formData.name,
        email: formData.email,
        role: formData.role,
      };
      dispatch(updateUser(userId, updatedData));
      setIsEditDialogOpen(false); // Close the dialog after update
    }
  };

  const handleDelete = (userId: string) => {
    setIsDeleteDialogOpen(true);
    setUserId(userId);
  };

  const handleConfirmDelete = () => {
    if (userId) {
      dispatch(DeleteUser(userId));
      dispatch(getUserList());
      setIsDeleteDialogOpen(false);
    }
  };

  return (
    <div className="flex flex-col p-2">
      <div className="flex justify-between">
        <h1 className="text-xl font-bold">User Management</h1>
        <Button onClick={() => setIsDialogOpen(true)}>Create Admin</Button>
      </div>

      {isDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-lg font-bold mb-4">Create Admin</h2>
            <div className="flex flex-col gap-2">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                className="p-2 border rounded-md"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="p-2 border rounded-md"
              />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="p-2 border rounded-md"
              />
              <input type="hidden" name="role" value={formData.role} />
              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSubmit}>Submit</Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isDeleteDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-lg font-bold mb-4">Delete User</h2>
            <p className="mb-4">Are you sure you want to delete this user?</p>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleConfirmDelete}>
                Confirm Delete
              </Button>
            </div>
          </div>
        </div>
      )}

      {isEditDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-lg font-bold mb-4">Edit User</h2>
            <div className="flex flex-col gap-2">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                className="p-2 border rounded-md"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="p-2 border rounded-md"
              />
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="p-2 border rounded-md"
              >
                <option value="Admin">Admin</option>
                <option value="User">User</option>
              </select>
              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSubmitEdit}>Save Changes</Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Role</th>
              <th className="border border-gray-300 px-4 py-2 text-center">Ban</th>
              <th className="border border-gray-300 px-4 py-2 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user: any, index: number) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">{user.name}</td>
                <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                <td className="border border-gray-300 px-4 py-2">{user.role}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <Switch
                    checked={user.isBan}
                    onCheckedChange={() => toggleStatus(user._id, !user.isBan)}
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(user)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(user._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
  