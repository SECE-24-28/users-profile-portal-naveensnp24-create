"use client";

import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import {
    GET_STUDENTS,
    ADD_STUDENT,
    UPDATE_STUDENT,
    DELETE_STUDENT,
} from "@/graphql/studentQueries";

export default function StudentsPage() {
    const { data, refetch } = useQuery(GET_STUDENTS);

    const [addStudent] = useMutation(ADD_STUDENT);
    const [updateStudent] = useMutation(UPDATE_STUDENT);
    const [deleteStudent] = useMutation(DELETE_STUDENT);

    const [editId, setEditId] = useState<string | null>(null);

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        department: "",
        year: "",
        profileImage: "",
    });

    function handleImage(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();

        reader.onloadend = () => {
            setForm({ ...form, profileImage: reader.result as string });
        };

        reader.readAsDataURL(file);
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        const variables = {
            ...form,
            year: form.year ? Number(form.year) : null,
        };

        if (editId) {
            await updateStudent({
                variables: {
                    id: editId,
                    ...variables,
                },
            });
        } else {
            await addStudent({
                variables,
            });
        }

        setForm({
            name: "",
            email: "",
            phone: "",
            department: "",
            year: "",
            profileImage: "",
        });

        setEditId(null);
        refetch();
    }

    function handleEdit(student: any) {
        setEditId(student.id);

        setForm({
            name: student.name ,
            email: student.email ,
            phone: student.phone ,
            department: student.department ,
            year: student.year?.toString() ,
            profileImage: student.profileImage || "",
        });
    }

    async function handleDelete(id: string) {
        await deleteStudent({
            variables: { id },
        });

        refetch();
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-3xl font-bold mb-6">Students Profile Page</h1>

                <form
                    onSubmit={handleSubmit}
                    className="bg-white p-5 rounded shadow mb-8 grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                    <input
                        className="border p-2 rounded"
                        placeholder="Name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />

                    <input
                        className="border p-2 rounded"
                        placeholder="Email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />

                    <input
                        className="border p-2 rounded"
                        placeholder="Phone"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    />

                    <input
                        className="border p-2 rounded"
                        placeholder="Department"
                        value={form.department}
                        onChange={(e) =>
                            setForm({ ...form, department: e.target.value })
                        }
                    />

                    <input
                        className="border p-2 rounded"
                        placeholder="Year"
                        type="number"
                        value={form.year}
                        onChange={(e) => setForm({ ...form, year: e.target.value })}
                    />

                    <input
                        className="border p-2 rounded"
                        type="file"
                        accept="image/*"
                        onChange={handleImage}
                    />

                    {form.profileImage && (
                        <img
                            src={form.profileImage}
                            className="w-24 h-24 rounded-full object-cover border"
                            alt="preview"
                        />
                    )}

                    <button className="bg-blue-600 text-white p-2 rounded">
                        {editId ? "Update Student" : "Add Student"}
                    </button>
                </form>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {data?.students?.map((student: any) => (
                        <div key={student.id} className="bg-white p-4 rounded shadow">
                            {student.profileImage ? (
                                <img
                                    src={student.profileImage}
                                    className="w-24 h-24 rounded-full object-cover mx-auto mb-3"
                                    alt={student.name}
                                />
                            ) : (
                                <div className="w-24 h-24 rounded-full bg-gray-300 mx-auto mb-3" />
                            )}

                            <h2 className="text-xl font-bold text-center">
                                {student.name}
                            </h2>

                            <p className="text-sm text-gray-600 text-center">
                                {student.email}
                            </p>

                            <p className="mt-2">Phone: {student.phone}</p>
                            <p>Department: {student.department}</p>
                            <p>Year: {student.year}</p>

                            <div className="flex gap-2 mt-4">
                                <button
                                    onClick={() => handleEdit(student)}
                                    className="flex-1 bg-yellow-500 text-white p-2 rounded"
                                >
                                    Edit
                                </button>

                                <button
                                    onClick={() => handleDelete(student.id)}
                                    className="flex-1 bg-red-600 text-white p-2 rounded"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}