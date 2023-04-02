<?php
namespace App\Repositories;
use App\Interfaces\CrudInterface;
use App\Models\Task;
use Illuminate\Http\Request;

class TaskRepository implements CrudInterface{

    public function getAll(){
       $tasks =  Task::orderBy('id','DESC')->get();
       return $tasks;
    }
    public function findById($id){
        $tasks =  Task::with('project')->find($id);
        return $tasks;
    }
    public function create(Request $request){
        $tasks = new Task();
        $tasks->name = $request->name;
        $tasks->description = $request->description;
        $tasks->project_id = $request->project_id;
        $tasks->save();
        return $tasks;
    }
    public function edit(Request $request, $id){
        $tasks = $this->findById($id);
        $tasks->name = $request->name;
        $tasks->description = $request->description;
        $tasks->project_id = $request->project_id;
        $tasks->save();
        return $tasks;
    }

    public function delete($id){
        $tasks = $this->findById($id);
        $tasks->delete();
        return $tasks;
    }
}