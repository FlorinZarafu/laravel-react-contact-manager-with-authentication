<?php

namespace App\Http\Controllers\User;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Contacts;
use Validator;
use Illuminate\Routing\UrlGenerator;
use File;

class ContactController extends Controller
{
    //
    protected $contacts;
   protected $base_url;

    public function __construct(UrlGenerator $urlGenerator)
    {
        $this->middleware("auth:users");
        $this->base_url = $urlGenerator->to("/");
        $this->contacts = new Contacts;
    }

    // this function/end-point is to create new contact specific to an user
    public function addContacts(Request $request)
    {
        $validator = Validator::make($request->all(),
        [

            "token"=>"required",
            "firstname"=>"required|string",
            "phonenumber"=>"required|string"
        ]
        );

        if($validator->fails()){
            return response()->json([
                "success"=>false,
                "message"=>$validator->messages()->toArray()
            ],500);
        }

        $profile_picture = $request->profile_image;
       $file_name = "";
       if($profile_picture==null)
       {
           $file_name = "default-avatar.png";
       }else{
        $generate_name = uniqid()."_".time().date("Ymd")."_IMG";
        $base64Image =  $profile_picture;
        $fileBin = file_get_contents($base64Image);
        ///////////////////////////////////////////////////////mistake
        $mimetype = mime_content_type($base64Image);  //make sure to pass the base64 image here;
        if("image/png"==$mimetype)
        {
            $file_name = $generate_name.".png";
        } 
        else if("image/jpeg"==$mimetype)
        {
            $file_name = $generate_name.".jpeg";
        }
        else if("image/jpg"==$mimetype)
        {
            $file_name = $generate_name."jpg";
        }
         else{

           return response()->json([
               "success"=>false,
               "message"=>"only png ,jpg and jpeg files are accepted for setting profile pictures"
           ],500);
            }
        }
        $user_token = $request->token;
      $user = auth("users")->authenticate($user_token);
      $user_id = $user->id;

        $this->contacts->user_id = $user_id;
        $this->contacts->phonenumber = $request->phonenumber;
        $this->contacts->firstname = $request->firstname;
        $this->contacts->lastname = $request->lastname;
        $this->contacts->email = $request->email;
        $this->contacts->image_file = $file_name;
        $this->contacts->save();

        if($profile_picture == null) {

        } else {
            file_put_contents("./profile_images/".$file_name, $fileBin);
        }

        return response()->json([
            "success"=>true,
            "message"=>"contact saved succesfully"
        ],200);
    }

    // getting contacts specific to a particular user
    public function getPaginatedData($token,$pagination=null){
        $file_directory = $this->base_url."/profile_images";
        $user = auth("users")->authenticate($token);
        $user_id = $user->id;
        if($pagination == null || $pagination == ""){
            $contacts = $this->contacts->where("user_id", $user_id)->orderBy("id", "DESC")->get()->toArray();
            return response()->json([
                "success"=>true,
                "data"=>$contacts,
                "file_directory"=>$file_directory
            ],200);
        }
        $contacts_paginated = $this->contacts->where("user_id",$user_id)->orderBy("id","DESC")->paginate($pagination);
        return response()->json([
            "success"=>true,
            "data"=>$contacts_paginated,
            "file_directory"=>$file_directory
        ],200);
    }

    // contacts update / end-point function
    public function editSingleData(Request $request,$id)
   {
      $validator = Validator::make($request->all(),
      [
          
          "firstname"=>"required|string",
          "phonenumber"=>"required|string"
      ]);

      
      if($validator->fails())
      {
          return response()->json([
              "success"=>false,
              "message"=>$validator->messages()->toArray()
          ],500);
      }

   
      $findData = $this->contacts::find($id);
      if(!$findData)
      {
        return response()->json([
            "success"=>false,
            "message"=>"please this content has no valid id"
        ],401);
      }

      
       $getFile = $findData->image_file;
      

      $getFile=="default-avatar.png"? :File::delete('profile_images/'.$getFile);
   

       $profile_picture = $request->profile_image;
       
       

      $file_name = "";
      if($profile_picture==null)
      {
          $file_name = "default-avatar.png";
      }else{
          $generate_name = uniqid()."_".time().date("Ymd")."_IMG";
       $base64Image =  $profile_picture;
       $fileBin = file_get_contents($base64Image);
       ///////////////////////////////////////////////////////mistake
       $mimetype = mime_content_type($base64Image); 
       if("image/png"==$mimetype)
       {
           $file_name = $generate_name.".png";
       } 
       else if("image/jpeg"==$mimetype)
       {
           $file_name = $generate_name.".jpeg";
       }
       else if("image/jpg"==$mimetype)
       {
           $file_name = $generate_name."jpg";
       }
        else{
          return response()->json([
              "success"=>false,
              "message"=>"only png ,jpg and jpeg files are accepted for setting profile pictures"
          ],500);
       }
       
     }

       
       $findData->firstname = $request->firstname;
       $findData->phonenumber = $request->phonenumber;
       $findData->image_file = $file_name;
       $findData->lastname = $request->lastname;
       $findData->email = $request->email;
       $findData->save();
       if($profile_picture == null)
       {
  
       }else{
           file_put_contents("./profile_images/".$file_name,$fileBin);
       }
  
       return response()->json([
            "success"=>true,
            "message"=>"contacts updated successfully",
       ],200);
    

   }

    // deleting contacts endpoint function
    public function deleteContacts($id){
        $findData = $this->contacts::find($id);
        
        if(!$findData){
            return response()->json([
                "success"=>false,
                "message"=>"no valid id"
            ],500);
        }
        $getFile = $findData->image_file;
        if($findData->delete()){
            $getFile == "default_avatar.png" ? :unlink("./profile_images/".$getFile);
            return response()->json([
                "success"=>true,
                "message"=>"contact deleted succesfully"
            ],200);
        }
    }

    // get single data
    public function getSingleData($id)
   {
       $file_directory = $this->base_url."/profile_images";
    $findData = $this->contacts::find($id);
    if(!$findData)
    {
        
    return response()->json([
     "success"=>true,
     "message"=>"contact with this id doesnt exist"
],500);
    }
    return response()->json([
        "success"=>true,
        "data"=>$findData,
        "file_directory"=>$file_directory
   ],200);
   }

    

    // search data
    public function searchData($search,$token,$pagination=null){
        $file_directory = $this->base_url."/profile_images";
        $user = auth("users")->authenticate($token);
        $user_id=$user->id;
        if($pagination==null || $pagination == ""){
            $non_paginated_search_query = $this->contacts::where("user_id", $user_id)->
            where(function($query) use ($search){
                $query->where("firstname","LIKE","%$search%")->orWhere("lastname","LIKE","%$search%")->orWhere("email","LIKE","%$search%")->orWhere("phonenumber","LIKE","%$search%");
            })->orderBy("id","DESC")->get()->toArray();
            return response()->json([
                "success"=>true,
                "data"=>$non_paginated_search_query,
                "file_directory"=>$file_directory
            ],200);
        }

        $paginated_search_query = $this->contacts::where("user_id", $user_id)->
        where(function($query) use ($search){
            $query->where("firstname","LIKE","%$search%")->orWhere("lastname","LIKE","%$search%")->orWhere("email","LIKE","%$search%")->orWhere("phonenumber","LIKE","%$search%");
        })->orderBy("id","DESC")->paginate($pagination);
        return response()->json([
            "success"=>true,
            "data"=>$paginated_search_query,
            "file_directory"=>$file_directory
        ],200);
    }
}
