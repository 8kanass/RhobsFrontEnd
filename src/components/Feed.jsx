import React from 'react'
import { useState , useEffect} from 'react'
import { Slider , Select , MenuItem , FormControl , InputLabel} from '@mui/material'
import { useForm } from "react-hook-form";
import { fetchBodies , fetchBody } from '../utils';
const Feed = () => {
    const {
        register,
        handleSubmit,
        watch,
        setValue,
      } = useForm()
      
      const [bodies, setBodies] = useState([]);
      const [bodyDetails, setBodyDetails] = useState(null)
      const isPlanet = watch("isPlanet");
      const body = watch("body");
      const gravity = watch("gravity")
      
      
    
      useEffect(() => {
        setValue("body", '');
        const fetchData = async () => {
          try {
            const cacheKey = isPlanet ? 'cachedDataIsPlanetTrue' : 'cachedDataIsPlanetFalse';
            const cachedData = localStorage.getItem(cacheKey);
            
            if (cachedData) {
              const { data, timestamp } = JSON.parse(cachedData);
              const expirationTime = 60 * 60 * 1000; // 1 hour
              const currentTime = new Date().getTime();
      
              if (currentTime - timestamp < expirationTime) {
                setBodies(data.bodies.map(body => ({
                  id: body.id,
                  name: body.name,
                  gravity: body.gravity
                })).filter(body => body.gravity <= gravity));
              } else {
                await fetchAndUpdateData(cacheKey);
              }
            } else {
              await fetchAndUpdateData(cacheKey);
            }
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
      
        const fetchAndUpdateData = async (cacheKey) => {
          const data = await fetchBodies(isPlanet);
          const timestamp = new Date().getTime();
          localStorage.setItem(cacheKey, JSON.stringify({ data, timestamp }));
          setBodies(data.bodies.map(body => ({
            id: body.id,
            name: body.name,
            gravity: body.gravity
          })).filter(body => body.gravity <= gravity));
        };
      
        fetchData();
      }, [isPlanet, gravity]);
      
      
      useEffect(() => {
        const fetchData = async () => {
          if (body) {
            try {
              const data = await fetchBody(body);
              setBodyDetails(data);
            } catch (error) {
              console.error('Error fetching body details:', error);
            }
          }
        };
        fetchData();
      }, [body]);
    
      const onSubmit = (data) => {
        console.log(data);
      };
      

  return (
    <section className="feed">
    <div className="w-full mb-5 p-6 border rounded-lg shadow-md bg-gray-50">
        <div className='flex-center'>
            <h1 className="text-2xl justify-center items-center font-semibold mb-4 blue_gradient font-semibold">RHOBS Challenge</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center mb-4">
          <input className="w-4 h-4 mr-2" id="isPlanet" type="checkbox" {...register("isPlanet")}/>
          <label className="flex-1 mr-4 text-gray-700" htmlFor="isPlanet">
            Is Planet
          </label>
          <Slider  defaultValue={15} min={0} max={30} aria-label="Default" valueLabelDisplay="auto" size='medium' className='max-w-xs' {...register("gravity")}/>
          <span className="ml-2 text-sm text-gray-500">gravity</span>
        </div>
        <div className="mb-4">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Bodies</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Body"
              defaultValue=""
              {...register("body")}
            >
              <MenuItem key="default" value="">Select...</MenuItem>
              {bodies.map((body, index) => (
                <MenuItem key={index} value={body.id}>
                  {body.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        {bodyDetails ? (
            <div className="border p-4 bg-white" >
              <div className='flex-1 flex flex-col gap-2'>
                <h2 className='font-semibold text-xl capitalize '>
                  {bodyDetails.name} 
                </h2>
                <div className='mt-3 flex flex-wrap gap-4'>
                    <div className='flex justify-between gap-5 w-full text-right border-b pb-2'>
                      <h4 className='text-gray-500 capitalize'>English Name:</h4>
                      <p className='text-black-100 font-semibold'>{bodyDetails.englishName}</p>
                    </div>
                    {bodyDetails.moons && bodyDetails.moons.length > 0 && (
                      <div className='flex justify-between gap-5 w-full text-right border-b pb-2'>
                        <h4 className='text-gray-500 capitalize'>Moons:</h4>
                        <p className='text-black font-semibold'>
                          {bodyDetails.moons.map(moon => moon.moon).join(', ')}
                        </p>
                      </div>
                    )}
                    <div className='flex justify-between gap-5 w-full text-right border-b pb-2'>
                      <h4 className='text-gray-500 capitalize'>Gravity:</h4>
                      <p className='text-black-100 font-semibold'>{bodyDetails.gravity}</p>
                    </div>
                    <div className='flex justify-between gap-5 w-full text-right '>
                      <h4 className='text-gray-500 capitalize'>Density:</h4>
                      <p className='text-black-100 font-semibold'>{bodyDetails.density}</p>
                    </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="border py-10 px-4">
              <p className="text-lg text-gray-800">Please select a body above</p>
            </div>
          )}
      </form>
    </div>
    </section>
  )
}

export default Feed