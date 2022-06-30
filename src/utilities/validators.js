export function nullValidator(value) {
  if (value === null || 
    value === undefined ||
    value === '' ||
    value === ' ' ||
    value === '  ' ||
    value === '   ' ||
    value === '    ' ||
    value === '     ' ||
    value === '      ' ||
    value === '       ' ||
    value === '        ' ||
    value === '         ' ||
    value === '          ' ||
    value === '           ' ||
    value === '            ' ||
    value === '             ' ||
    value === '              ' ||
    value === '               ' ||
    value === '                ' ||
    value === '                 ' ||
    value === '                  ' ||
    value === '                   ' ||
    value === '                    ' ||
    value === '                     ' ||
    value === '                      ' ||
    value === '                       ' ||
    value === '                        ' ||
    value === '                         ' ||
    value === '                          ' ||
    value === '                           ' ||
    value === '                            ') {
    return true;
    // If this function returns true, the validation will fail
  }
}