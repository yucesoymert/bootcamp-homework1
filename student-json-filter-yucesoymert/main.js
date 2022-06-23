import './style.css'
import data from './data'

document.querySelector('#app').innerHTML = `
  <h1>Hello!</h1>
  <p>using this document</p>
  <a href="https://github.com/Frontend-Bootcamp-2022/student-json-filter-yucesoymert/blob/main/data.json" target="_blank">Documentation</a>
  <p>create a group by group names</p>
  <p>specify the assistants of each group</p>
`
const leftSide = document.querySelector('.membersData')
const rightSide = document.querySelector('.editedData')

const makeGroup = () => {
  const allGroups = data.map(member => member.group) 
  
  const uniqueGroups = [...new Set(allGroups)]
  
  const whoIsAssistant = data.filter(item => item.assistant === true)
  
  const newData = uniqueGroups.map(group => {
    return {
      group,
      members: data.filter(item => item.group === group),
      assistant: whoIsAssistant.filter(item => item.group === group)
    }
  })
  return newData
}
const groupBy = makeGroup()
console.log('groupBy', groupBy)

const beforeData = (items) => {
  let displayLeft = items.map((item) => {
    return `
    <div class="group">
      <div class="groupMembers">
        <div class="memberId">Id: ${item.id}</div>
        <div class="memberName">Name: ${item.name}</div>
        <div class="groupAssistant">Assistant: ${item.assistant}</div>
        <div class="memberGroup">Group: ${item.group}</div>
      </div>
    </div>
    `;
  });
  displayLeft = displayLeft.join("");
  leftSide.innerHTML = displayLeft;
};

beforeData(data);
  
const afterData = (items)   => {
  let displayRight = items.map((item) => {
    return `
    <div class="group" style="border: 3px solid ${item.group};">
      <h2 class="groupName">Group: ${item.group}</h2>
      <h4 class="assistantName"><strong>Assistant: </strong>${item.assistant[0].name}</h4>
      <div>
        <h4 class="groupMembersTitle">Members:</h4>
        <ul class="groupMembers">
        ${item.members.map(el => {
          return `
          <li>${el.name}</li>
          `
        }
          ).join("")}  
        </ul>
      </div>
    </div>
    `;
  });
  displayRight = displayRight.join("");
  rightSide.innerHTML = displayRight;
};

afterData(groupBy);