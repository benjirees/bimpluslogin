/*
    Driver code is located at the bottom of this class. This driver code is for testing the class and can be 
    altered/removed based on the use case (If you delete the driver code also delete this comment).
    Driver code could be moved to a 'script.js' file to access the class.
*/

/*
    Features so far:
        - Authorise API Access
        - Get All Projects
        - Get Specific Project
        - Get Project Properties
        - Get Issues from Project
        - Get Topology Tree from project
        - Get Material Surfaces from project
*/
const axios = require('axios');
export class bimplusAPI {
    constructor() {
        this.email = null;
        this.password = null;
        this.appId = null;
        this.accessToken = null;
        this.teamSlug = null;
    }

    /*
        This method authorises the user and confirms their access to the API.
        This method needs to be called first, the 'accessToken' variable will be
        the indicator for whether this method has either been run or if it has been
        successful.
        Sends a post request to the authorise URL and gets the user access to the API
        if their credentials are valid.
    */
    authorise(email, password, appId) {

        this.email = email;
        this.password = password;
        this.appId = appId;

        let url = "https://api.bimplus.net/v2/authorize"; // Authorisation URL

        // Data that will be sent to the API:
        const data = {
            "user_id": this.email,
            "password": this.password,
            "application_id": this.appId
        };

        // Axios post request to the above url using our constructed data:
        return axios.post(url, data).then((res) => {
            console.log(`Status: ${res.status}`); // Show status of request (200 = successful)
    
            if (res.status === 200) {
                // console.log('Data response: ', res.data);
                this.accessToken = "BimPlus " + res.data.access_token;
                return res;
            // Display the error code if failed:
            } else {
                console.log('error: ', res.status);
                return res;
            }
        }).catch((err) => {
            console.log(err);
            return err;
        })
    }

    /* Project Functions: */

    /*
        This method allows a user to get a list of all projects associated with their account. 
        If successful, it will return the list of projects in JSON format.
    */
    getAllProjects() {
        
        // If the token is null, authorisation function has been run correctly or user credentials are wrong:
        if (this.accessToken === null) {
            console.log("Please authorise before accessing projects");
        // Else, we have an access token that we can use to get the users projects:
        } else {
            let url = "https://api.bimplus.net/v2/projects"; // Bimplus API projects URL
            return this.sendGet(url);
        }
        
    }

    /*
        This method allows a user to target and return the data for a specific project.
        Params: Id of the project
    */
    getSpecificProject(projectId) {
        if (this.accessToken === null) {
            console.log("Please authorise before accessing projects");
        } else {
            let url = "https://api.bimplus.net/v2/projects";
            axios.get(url, {
                headers: {
                    "Authorization": this.accessToken,
                    "Content-Type": "application/json"
                }
            }).then((response) => {
                if (response.status === 200) {
                    // Loop through all projects in the response until we find the id match and return the specific project:
                    for (let i = 0; i < response.data.length; i++) {
                        let obj = response.data[i];
                        // If the current iteration id is = to paramterised project id return the current project:
                        if (obj.id === projectId) {
                            return obj;
                        }
                    }
                } else {
                    return response.status;
                }
            }).catch((err) => {
                console.log(err);
                return err;
            })
        }
    }

    getProjectProperties(projectId) { 
        if (this.accessToken === null) {
            console.log("Please authorise before accessing projects");
            return "Please authorise before accessing projects";
        } else {
            if (this.teamSlug === null) {
                console.log("Please set team slug before using this function");
                return "Please set team slug before using this function";
            } else {
                let url = 'https://api.bimplus.net/v2/' + this.teamSlug + '/projects/' + projectId;
                return this.sendGet(url);
            }
        }
    }

    // Gets issues from a certain project:
    getIssuesFromProject(projectId) {
        if (this.teamSlug === null) {
            return "Please set team slug with setTeamSlug() function";
        } else {
            let url = 'https://api.bimplus.net/v2/' + this.teamSlug + '/projects/' + projectId + '/issues';
            this.sendGet(url);
        }
    }

    // Gets the topology tree from a specific project:
    getTopologyTree(projectId) {
        if (this.teamSlug === null) {
            return "Please set team slug with setTeamSlug() function";
        } else {
            let url = 'https://api.bimplus.net/v2/' + this.teamSlug + '/projects/' + projectId + '/topology';
            this.sendGet(url);
        }
    }

    // Gets all material surfaces for specific project:
    getMaterialSurfaces(projectId) {
        if (this.teamSlug === null) {
            return "Please set team slug with setTeamSlug() function";
        } else {
            let url = 'https://api.bimplus.net/v2/' + this.teamSlug + '/projects/' + projectId + '/materialsurfaces';
            this.sendGet(url);
        }
    }

    sendGet(url) {
        axios.get(url, {
            headers: {
                "Authorization": this.accessToken,
                "Content-Type": "application/json"
            }
        }).then((response) => {
            if (response.status === 200) {
                console.log("Successfully returned data");
                return response;
            } else {
                return response.status;
            }
        }).catch((err) => {
            console.log(err);
            return err;
        })
    }

    sendPost(url, data) {
        axios.post(url, data).then((response) => {
            if (response.status === 200) {
                console.log("Post Successful");
            } else {
                return response.data;
                console.log("Success");
            }
        })
    }

    setTeamSlug(teamSlug) {
        this.teamSlug = teamSlug;
    }

    setAccessToken(accessToken) {
        this.accessToken = accessToken;
    }

    getAccessToken() {
        return this.accessToken;
    }
}

// // Driver code:
// let myEmail = ''; // Enter your email here (Required)
// let myPassword = ''; // Enter your password here (Required)
// let appId = ''; // Enter your app id here (Required)
// let myTeamSlug = ''; // Enter your team slug here (Not Required)

// let api = new bimplusAPI();

// api.authorise(myEmail, myPassword, appId);



