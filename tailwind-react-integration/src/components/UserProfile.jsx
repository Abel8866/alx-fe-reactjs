
function UserProfile() {
  return (
    <div className="max-w-sm mx-auto my-20 rounded-lg bg-gray-100 p-8 shadow-lg ring-1 ring-gray-200 flex flex-col items-center text-center">
      <img
        src="https://via.placeholder.com/150"
        alt="User"
        className="w-36 h-36 rounded-full object-cover shadow-sm ring-4 ring-blue-100 mx-auto"
      />
      <h1 className="mt-5 text-xl font-semibold text-blue-800 my-4">John Doe</h1>
      <p className="mt-2 text-base leading-relaxed text-gray-600">
        Developer at Example Co. Loves to write code and explore new technologies.
      </p>
    </div>
  );
}

export default UserProfile;