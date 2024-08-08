using System;
using System.Collections.Generic;

namespace Server;

public partial class Participant
{
    public long ParticipantId { get; set; }

    public string? CompanyName { get; set; }

    public string? Cedula { get; set; }

    public string? Name { get; set; }

    public string? Title { get; set; }

    public string? Email { get; set; }

    public string? Phone { get; set; }
}
