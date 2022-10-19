import React, { useEffect, useState } from 'react'
import { Button, OverlayTrigger, Table, Tooltip } from 'react-bootstrap'
import { useRecoilValue } from 'recoil';
import Loading from '../../../components/Loading';
import userApi from '../../../_actions/userApi';
import { toastAtom } from '../../../_state';
import CreateCategory from './CreateCategory'

const Categories = () => {

   const [categories, setCategories] = useState();
   const toast = useRecoilValue(toastAtom);

   const loadCategories = async () => {
      try {
         const categoriesData = await (await userApi.getCategories()).data;
         setCategories(categoriesData);

      } catch (error) {
         console.log(error);
      }
   }

   useEffect(() => {
      loadCategories();
   }, [toast])

   useEffect(() => {
      loadCategories();
   }, []);

   return (
      <>
         <div className="vh-75 col-7 ps-4 mt-4">
            <div className='my-3 d-flex justify-content-between align-items-center'>
               <div className='d-flex'>
                  <h3 className='fw-bold'>Course Categories</h3>

                  <OverlayTrigger
                     placement="top"
                     overlay={
                        <Tooltip id="tooltip-top">
                           Courses will classify into categories.
                        </Tooltip>
                     }
                  >
                     <i className="ms-2 fa-solid fa-circle-info"></i>
                  </OverlayTrigger>
               </div>
               <CreateCategory />
            </div>

            <Table striped bordered hover size="sm">
               <thead>
                  <tr>
                     <th> #</th>
                     <th>Category Name</th>
                     <th className='col-2 text-center'>Edit</th>
                  </tr>
               </thead>
               <tbody>
                  {
                     categories ?
                        categories.map((category, index) => {
                           return <tr>
                              <td>{index + 1}</td>
                              <td>{category.name}</td>
                              <td className='col-2 text-center'><Button variant='warning'><i class="fa-solid fa-pen"></i></Button></td>
                           </tr>
                        }) : <Loading />
                  }
               </tbody>
            </Table>
         </div>
      </>
   )
}

export default Categories