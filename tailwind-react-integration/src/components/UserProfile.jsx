
function UserProfile() {
  return (
    <div className="mx-auto my-10 md:my-20 w-full sm:max-w-xs md:max-w-sm rounded-lg bg-gray-100 sm:p-4 md:p-8 shadow-lg ring-1 ring-gray-200 flex flex-col items-center text-center">
      <img
        src="https://via.placeholder.com/150"
        alt="User"
        className="sm:w-24 sm:h-24 md:w-36 md:h-36 rounded-full object-cover shadow-sm ring-4 ring-blue-100 mx-auto"
      />
      <h1 className="mt-5 sm:text-lg md:text-xl font-semibold text-blue-800 my-4">John Doe</h1>
      <p className="mt-2 sm:text-sm md:text-base leading-relaxed text-gray-600">
        Developer at Example Co. Loves to write code and explore new technologies.
      </p>
    </div>
  );
}

export default UserProfile;