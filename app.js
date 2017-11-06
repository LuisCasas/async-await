const users = [{
    id: 1,
    name: 'John',
    schoolID: 101
}, {
    id: 2,
    name: 'Jane',
    schoolID: 121
}, {
    id: 3,
    name: 'Mike',
    schoolID: 101
}];


const grades = [{
    id: 1,
    schoolID: 101,
    grade: 77
}, {
    id: 2,
    schoolID: 121,
    grade: 55
}, {
    id: 3,
    schoolID: 101,
    grade: 81
}];

const getUser = (id) => {
    return new Promise((resolve, reject) => {
        const user = users.find((user) => user.id === id);

        if(user){
            resolve(user);
        } else {
            reject(`Unable to find user id: ${id}`);
        }
    });
};

const getGrades = (schoolID) => {
    return new Promise((resolve, reject) => {
        resolve(grades.filter((grade) => grade.schoolID === schoolID));
    });
};

const getStatus = (userId) => {
    let user;
    return getUser(userId).then((tempUser) => {
        user = tempUser;
        return getGrades(user.schoolID);
    }).then((grades) => {
        let average = 0;

        if(grades.length > 0){
            average = grades.map((grade) => grade.grade).reduce((a, b) => a + b) / grades.length;
        }

        return `${user.name} has an average grade of ${average}`;
      //  console.log(average);
    });
};

const getStatusAlt = async (userId) => {
    const user = await getUser(userId);
    const grades = await getGrades(user.schoolID);
    let average = 0;

    if(grades.length > 0){
        average = grades.map((grade) => grade.grade).reduce((a, b) => a + b) / grades.length;
    }

    return `${user.name} has an average grade of ${average}`;
};

getStatusAlt(2).then((name) => {
    console.log(name);
}).catch((err) => {
    console.log(err);
});

/*
getStatus(1).then((status) => {
    console.log(status);
}).catch((err) => {
    console.log(err);
});
*/

/*
getGrades(121).then((grades) => {
    console.log(grades);
}).catch((err) => {
    console.log(err);
});
*/

/*
getUser(2).then((user) => {
    console.log(user);
}).catch((err) => {
    console.log(err);
});
*/