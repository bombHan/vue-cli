import api from "@/api/api";

export function addressBack(arrIds) {
  let _province = api.region01({ regionId: "" }).then(res => res.data);
  let _city = api.region01({ regionId: arrIds[0] }).then(res => res.data);
  let _district = api.region01({ regionId: arrIds[1] }).then(res => res.data);
  return Promise.all([_province, _city, _district]).then(data => {
    let afterArr = [];
    let provinceList = Object.keys(data[0]);
    for (let i = 0; i < provinceList.length; i++) {
      afterArr.push({
        label: data[0][provinceList[i]],
        value: provinceList[i],
        isLeaf: false
      });
      if (provinceList[i] == arrIds[0]) {
        afterArr[i].children = [];
        let cityList = Object.keys(data[1]);
        for (let j = 0; j < cityList.length; j++) {
          afterArr[i].children.push({
            label: data[1][cityList[j]],
            value: cityList[j],
            isLeaf: false
          });
          if (cityList[j] == arrIds[1]) {
            afterArr[i].children[j].children = [];
            let districtList = Object.keys(data[2]);
            for (let m = 0; m < districtList.length; m++) {
              afterArr[i].children[j].children.push({
                label: data[2][districtList[m]],
                value: districtList[m],
                isLeaf: true
              });
            }
          }
        }
      }
    }
    return afterArr;
  })
}