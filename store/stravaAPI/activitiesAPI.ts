const access_token = process.env.NEXT_PUBLIC_ACCESS_TOKEN

export const activitiesAPI = async() => {
  let response = await fetch(
    `https://www.strava.com/api/v3/athlete/activities?page=5&per_page=100`,
    {
      method: "GET",
      headers:{
        'Authorization': `Bearer ${access_token}`
      }
    }
  );

  try{
    if (!response.ok){
      throw new Error (`Failed to get activites`)
    } else {
      const jsonRes = await response.json();
      console.log(jsonRes, "activity res")
    }
  } catch (error){
    console.log(error)
  }
}