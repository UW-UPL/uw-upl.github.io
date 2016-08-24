  $(document).ready(function() {
    function createMachineRow(machine) {
      var offlineClass = !machine.online && 'offline';
      var status = machine.online ? 'Online' : 'Offline';
      return $('<tr>')
          .append($('<td class="st-key">').text(machine.name))
          .append($('<td class="st-val">').addClass(offlineClass).text(status));
    }

    $.ajax({
      url: 'http://eris.upl.cs.wisc.edu:1312/lab-status',
      type: 'GET',
      success: function(txt) {
        var data = JSON.parse(txt);
        data.workstations.machines.sort(function (a, b) {
          return a.name > b.name;
        });
        data.servers.machines.sort(function (a, b) {
          return a.name > b.name;
        });
        var container = $('<div class="lab-table-container">');
        var table = $('<table class="striped lab-status">');
        var machineHeader = $('<tr class="t-head"><th>Workstation</th><th>Status</th></tr>');
        table.append($('<tbody>').append(machineHeader));
        var machines = $('<tbody>');
        data.workstations.machines.forEach(function (machine) {
          machines.append(createMachineRow(machine));
        });
        table.append(machines);

        var serverHeader = $('<tr class="t-head"><th>Server</th><th>Status</th></tr>');
        table.append($('<tbody>').append(serverHeader));
        var servers = $('<tbody>');
        data.servers.machines.forEach(function (machine) {
          servers.append(createMachineRow(machine));
        });
        table.append(servers);

        container.append(table);
        $('#labStatus').html(container);
      }
    });
  });
