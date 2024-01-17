document.addEventListener('DOMContentLoaded', async () => {
    const groupsContainer = document.getElementById('groups-container');
  
    try {
      const response = await fetch('foodWasteData.json');
      const groupsData = await response.json();
  
      groupsData.forEach(group => {
        const groupDiv = document.createElement('div');
        groupDiv.classList.add('group');
  
        const groupName = document.createElement('h2');
        groupName.textContent = group.name;
  
        const groupMembers = document.createElement('p');
        groupMembers.textContent = `Members: ${group.members.join(', ')}`;
  
        const groupPreferences = document.createElement('p');
        groupPreferences.textContent = `Preferences: ${JSON.stringify(group.preferences)}`;
  
        const groupCreatedBy = document.createElement('p');
        groupCreatedBy.textContent = `Created by: ${group.createdBy}`;
  
        const groupDescription = document.createElement('p');
        groupDescription.textContent = `Description: ${group.description}`;
  
        groupDiv.appendChild(groupName);
        groupDiv.appendChild(groupMembers);
        groupDiv.appendChild(groupPreferences);
        groupDiv.appendChild(groupCreatedBy);
        groupDiv.appendChild(groupDescription);
  
        groupsContainer.appendChild(groupDiv);
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  });
  