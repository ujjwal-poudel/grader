'use client';

export default function PersistenceMessage({ prediction }) {
  // Convert to number if it’s a string
  const isPersisting = Number(prediction) === 1;

  return (
    <h2 className="text-3xl sm:text-4xl font-bold mb-4 drop-shadow text-white pb-10">
      Student Will{' '}
      {isPersisting ? (
        <span className="text-green-500">Persist</span>
      ) : (
        <span className="text-red-500">Not Persist</span>
      )}
    </h2>
  );
}
