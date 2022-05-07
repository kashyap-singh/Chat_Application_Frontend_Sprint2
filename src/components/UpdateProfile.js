import instance from '../config/axiosConfig';
export default class updateProfile
{

    //Sending New Name to the database
    static async changeName(phone,password,uid,name)
    {
        try
        {
            const params = JSON.stringify({
                phone:phone,
                password:password,
            })
            const response = await instance.post('users/auth',params);
            if(response.status === 201 ||response.status ===200)
            {
                const params1 = JSON.stringify({
                    uid:uid,
                    name:name
                })
                const profile1 = await instance.put('users/changeName',params1);
                if(profile1)
                {
                    console.log('Success');
                }
            }
        }
        catch(e)
        {
            console.error(error.response.data.message)
        }
    }

    //Sending new Avatar to the database
    static async changePhoto(phone,password,uid,avatar)
    {
        try
        {
            const params = JSON.stringify({
                phone:phone,
                password:password,
            })
            const response = await instance.post('users/auth',params);
            if(response.status === 201 ||response.status ===200)
            {
                const params1 = JSON.stringify({
                    uid:uid,
                    avatar:avatar
                })
                const profile1 = await instance.put('users/changePhoto',params1);
                if(profile1)
                {
                    console.log('Success');
                }
            }
        }
        catch(e)
        {
            console.error(error.response.data.message)
        }
    }
}