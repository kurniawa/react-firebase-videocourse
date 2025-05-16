// components/ListView.jsx
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../store/actions/dataActions'; // Import fetchData dari dataActions.js
import {
  selectData,
  selectDataLoading,
  selectDataError,
} from '../store/slices/dataSlice'; // Import selector dari dataSlice.js
import MainLayout from '../layouts/MainLayout';
import TrForListView from '../components/organisms/TrForListView';
import AddUserForListView from '../components/organisms/AddUserForListView';


const ListView = () => {
  const dispatch = useDispatch();
  const data = useSelector(selectData);
  const loading = useSelector(selectDataLoading);
  const error = useSelector(selectDataError);

  const [showAddUser, setShowAddUser] = useState(false);

  useEffect(() => {
    dispatch(fetchData('users')); // Dispatch action fetchData dari dataActions.js
  }, [dispatch]);

  const toggleAddUser = () => {
    setShowAddUser(!showAddUser);
  };

  if (loading) {
    return <div>Loading data...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <MainLayout>
      <div>
        <div className='flex justify-center p-5'>
          <h2 className='text-2xl font-bold'>Daftar User</h2>
        </div>
        <div className='flex justify-end px-5'>
          <button onClick={toggleAddUser} className={`${showAddUser ? "bg-emerald-200 " : ""}text-emerald-500 border border-emerald-300 px-2 hover:cursor-pointer rounded-xl`}>Tambah User</button>
        </div>
        <div className={showAddUser ? "flex justify-center" : "hidden"}>
          <AddUserForListView />
        </div>
        <div className='p-5 flex justify-center'>
          <table className='table-nice'>
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Email</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map(item => (
                  <TrForListView userData={item.firestoreUserData} key={item.firestoreUserData.uid} />
                ))
                ) : (
                <tr><td colSpan={4}>No data available.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </MainLayout>
  );
};

export default ListView;