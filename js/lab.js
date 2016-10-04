  $(document).ready(function() {
    function createMachineRow(machine) {
      var offlineClass = !machine.online && 'offline';
      var status = machine.online ? 'Online' : 'Offline';
      return $('<tr class="lab-table-machine-container">')
          .append($('<td>').text(machine.name))
          .append($('<td>').addClass(offlineClass).text(status));
    }

    function sortByName(a, b) {
      return a.name > b.name;
    }

    $.ajax({
      url: 'http://siren.upl.cs.wisc.edu:1312/lab-status',
      type: 'GET',
      success: function(txt) {
        var data = JSON.parse(txt);

        var machineContainer = $("#lab-table-workstation-container");
        data.workstations.machines.sort(sortByName).forEach(function(machine) {
          machineContainer.append(createMachineRow(machine));
        });

        var serverContainer = $("#lab-table-server-container");
        data.servers.machines.sort(sortByName).forEach(function(machine) {
          serverContainer.append(createMachineRow(machine));
        });

        $('#labStatus').remove();
        $(".lab-status").show();
      }
    });
  });
