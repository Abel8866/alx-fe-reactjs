function UserProfile({ name, age, bio }) {
	return (
		<section>
			<h2>{name}</h2>
			<p>Age: {age}</p>
			<p>{bio}</p>
		</section>
	);
}

export default UserProfile;
